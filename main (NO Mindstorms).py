import cv2
import numpy as np
import blend_modes
from openai import OpenAI
import urllib.request
from time import sleep

# whether to use AI or a custom image
useAI = False

# Prompt describing the desired image
object = "desired image"

# Filename of the custom image
filename = "customImage.png"

# Variables for the pixelation algorithm
usepixelation = True
imgSize = 32

# whether to use the lego overlay on images
useOverlay = True
legoOverlay = cv2.imread("lego_overlay.png", -1).astype(float)

# Define the BGR values of Lego colors
colors_bgr = {
    'white': (255,255,255),
    'dark bluish gray': (104, 110, 108),
    'light bluish gray': (169, 165, 160),
    'tan': (158,205,228),
    'reddish brown': (18,42,88),
    'bright pink': (200,173,228),
    'dark purple': (145,54,63),
    'blue': (191,85,0),
    'dark azure': (201,139,7),
    'green': (65,120,35),
    'lime': (11,233,187),
    'yellow': (55,205,242),
    'orange': (24,138,254),
    'red': (9,26,201),
    'black': (0,0,0)
}

# Define the amount of usable Lego bricks in the machine
color_amount = 23
colors_stock = {
    'dark bluish gray': color_amount,
    'light bluish gray': color_amount,
    'tan': color_amount,
    'reddish brown': color_amount,
    'bright pink': color_amount,
    'dark purple': color_amount,
    'blue': color_amount,
    'dark azure': color_amount,
    'green': color_amount,
    'lime': color_amount,
    'yellow': color_amount,
    'orange': color_amount,
    'red': color_amount,
    'black': color_amount
}

# Function definitions from imageFunctions.py
def confirm_image(imgSize, object, AIfilename):
    original_image = cv2.imread(AIfilename)
    cv2.imwrite("result.png", original_image)
    exit_main_loop = False
    while not exit_main_loop:
        # Read and show the input image
        original_image = cv2.imread("result.png")
        cv2.imshow("Original Image", cv2.resize(original_image, (512, 512), interpolation=cv2.INTER_NEAREST))
        cv2.setWindowProperty("Original Image", cv2.WND_PROP_TOPMOST, 1)
        cv2.moveWindow("Original Image", 136,200)
        print('Image generated.\nPress: "C" to Confirm, "R" to Regenerate, "T" to Trim.')
        while True:
            key = cv2.waitKey(1)
            if key == ord('c'):
                cv2.destroyAllWindows()
                original_image = cv2.imread(AIfilename)
                cv2.imwrite("result.png", original_image)
                exit_main_loop = True
                break
            elif key == ord('r'):
                cv2.destroyAllWindows()
                print(f'\nGenerating image from prompt: "{object}"\n')
                AIGenerator(object, AIfilename)
                original_image = cv2.imread(AIfilename)
                cv2.imwrite("result.png", original_image)
                break
            elif key == ord('t'):
                cv2.destroyAllWindows()
                ImgCropper(AIfilename, imgSize)
                exit_main_loop = True
                break

def pixelate_image(original_image, imgSize):
    height, width = original_image.shape[:2]
    rows, cols = imgSize, imgSize
    # Calculate the size of each square
    row_size = height // rows
    col_size = width // cols
    # Create a copy of the original image to apply pixelation
    pixelated_image = np.zeros((rows, cols, 3), dtype=np.uint8)

    for i in range(0, height, row_size):
        for j in range(0, width, col_size):
            center_pixel_color = original_image[i + row_size // 2, j + col_size // 2]
            pixelated_image[i//row_size, j//col_size] = center_pixel_color

    return pixelated_image

def find_closest_color(pixel, color_dict):
    pixel_array = np.array(pixel)
    color_values = np.array(list(color_dict.values()))
    distances = np.linalg.norm(color_values - pixel_array, axis=1)
    closest_color_index = np.argmin(distances)
    closest_color = list(color_dict.keys())[closest_color_index]
    
    return color_dict[closest_color], closest_color

def simplify_image(image, colors_dict):
    recipe = {
        'red': 0,
        'orange': 0,
        'yellow': 0,
        'lime': 0,
        'green': 0,
        'dark azure': 0,
        'blue': 0,
        'dark purple': 0,
        'bright pink': 0,
        'reddish brown': 0,
        'tan': 0,
        'light bluish gray': 0,
        'dark bluish gray': 0,
        'black': 0,
        'white': 0
    }
    height, width, _ = image.shape
    mapped_image = np.zeros((height, width, 3), dtype=np.uint8)

    for i in range(height):
        for j in range(width):
            pixel = image[i, j]
            closest_color, closest_color_name = find_closest_color(pixel, colors_dict)
            mapped_image[i, j] = closest_color
            recipe[closest_color_name] += 1
    
    del recipe['white']
    for i in list(recipe.keys()):
        if recipe[i] == 0:
            del recipe[i]

    return mapped_image, recipe

# Function definitions from imageGenerator.py
client = OpenAI(api_key='sk-YOUR KEY')  # Get your own by signing up for OpenAI's website

def AIGenerator(object, AIfilename):
    text = f"I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: {object}. The most simple 2D cartoon depiction of {object}, but still resembling real. Very little detail colored clipart."
    
    # calling the custom function "generate"
    # saving the output in the file "result.jpg"
    url = generate(text)
    urllib.request.urlretrieve(url, AIfilename)

# function for text-to-image generation
# using create endpoint of DALL-E API
# function takes in a string argument
def generate(text):
    res = client.images.generate(
        model="dall-e-3",
        prompt=text,
        n=1,
        size="1024x1024",
    )
    # returning the URL of one image as we are generating only one image
    return res.data[0].url

# Function definitions from imageCropper.py
# This function requires a filename of the image and imgSize.
# imgSize is a number the final cropped square image must be dividable by, in both the width and the height.

def mouse_crop(event, x_crop, y_crop, flags, param):
    global x_start_crop, y_start_crop, x_end_crop, y_end_crop, cropping, initialCrop
    if event == cv2.EVENT_LBUTTONDOWN:
        x_start_crop, y_start_crop, x_end_crop, y_end_crop = x_crop, y_crop, x_crop, y_crop
        cropping = True
    elif event == cv2.EVENT_MOUSEMOVE:
        if cropping == True:
            sideLength = max(abs(x_crop-x_start_crop), abs(y_crop-y_start_crop))
            try:
                x_end_crop, y_end_crop = int(x_start_crop+((x_crop-x_start_crop)/abs(x_crop-x_start_crop)*sideLength)), int(y_start_crop+((y_crop-y_start_crop)/abs(y_crop-y_start_crop)*sideLength))
            except:
                x_end_crop, y_end_crop = x_start_crop, y_start_crop
    elif event == cv2.EVENT_LBUTTONUP:
        cropping = False
        initialCrop = True

def mouse_crop_adjust(event, x_crop, y_crop, flags, param):
    global x_start_crop, y_start_crop, x_end_crop, y_end_crop, cropping, moveStartCrop, moveEndCrop, moveCrop, previous_x_crop, previous_y_crop, croppedimg
    if event == cv2.EVENT_LBUTTONDOWN:
        cropping = True
        if abs(x_crop-x_start_crop) < 10 and abs(y_crop-y_start_crop) < 10:
            moveStartCrop = True
            moveEndCrop = False
            moveCrop = False
        elif abs(x_crop-x_end_crop) < 5 and abs(y_crop-y_end_crop) < 5:
            moveStartCrop = False
            moveEndCrop = True
            moveCrop = False
        elif x_start_crop < x_crop < x_end_crop and y_start_crop < y_crop < y_end_crop:
            moveStartCrop = False
            moveEndCrop = False
            moveCrop = True
        else:
            moveStartCrop = False
            moveEndCrop = False
            moveCrop = False
    elif event == cv2.EVENT_MOUSEMOVE:
        if cropping == True:
            if moveStartCrop:
                sideLength = max(abs(x_crop-x_end_crop), abs(y_crop-y-end_crop))
                try:
                    x_start_crop, y_start_crop = int(x_end_crop+((x_crop-x_end_crop)/abs(x_crop-x_end_crop)*sideLength)), int(y_end_crop+((y_crop-y_end_crop)/abs(y_crop-y-end_crop)*sideLength))
                except:
                    pass
            elif moveEndCrop:
                sideLength = max(abs(x_crop-x_start_crop), abs(y_crop-y_start_crop))
                try:
                    x_end_crop, y_end_crop = int(x_start_crop+((x_crop-x_start_crop)/abs(x_crop-x_start_crop)*sideLength)), int(y_start_crop+((y_crop-y_start_crop)/abs(y_crop-y_start_crop)*sideLength))
                except:
                    pass
            elif moveCrop:
                x_start_crop = x_start_crop+x_crop-previous_x_crop
                y_start_crop = y_start_crop+y_crop-previous_y_crop
                x_end_crop = x_end_crop+x_crop-previous_x_crop
                y_end_crop = y_end_crop+y_crop-previous_y_crop
    elif event == cv2.EVENT_LBUTTONUP:
        cropping = False
        if x_end_crop < x_start_crop:
            x_start_crop = x_start_crop+x_end_crop
            x_end_crop = x_start_crop-x_end_crop
            x_start_crop = x_start_crop-x_end_crop
        if y_end_crop < y_start_crop:
            y_start_crop = y_start_crop+y_end_crop
            y_end_crop = y_start_crop-y_end_crop
            y_start_crop = y_start_crop-y_end_crop
        refPoint = [(x_start_crop, y_start_crop), (x_end_crop, y_end_crop)]
        if len(refPoint) == 2:  # when two points were found
            croppedimg = image[refPoint[0][1]:refPoint[1][1], refPoint[0][0]:refPoint[1][0]]
    previous_x_crop = x_crop
    previous_y_crop = y_crop

def ImgCropper(filename, imgSize):
    global image, cropping, initialCrop, x_start_crop, x_end_crop, y_start_crop, y_end_crop, croppedimg
    cropping = False
    initialCrop = False
    x_start_crop, y_start_crop, x_end_crop, y_end_crop = 0, 0, 0, 0
    cv2.namedWindow("image")
    cv2.setWindowProperty("image", cv2.WND_PROP_TOPMOST, 1)
    cv2.moveWindow("image", 20,20)
    image = cv2.imread(filename)
    height, width, _ = image.shape
    print('Select the desired region of the image and press "C" to confirm.')
    if max(width,height) < 850:
        if width > height:
            image = cv2.resize(image, (850,int(height*(850/width))), interpolation=cv2.INTER_NEAREST)
        else:
            image = cv2.resize(image, (int(width*(850/height)), 850), interpolation=cv2.INTER_NEAREST)
    else:
        if width > height:
            image = cv2.resize(image, (850,int(height*(850/width))))
        else:
            image = cv2.resize(image, (int(width*(850/height)), 850))
    cv2.setMouseCallback("image", mouse_crop)

    while True:
        imagegui = image.copy()
        if not cropping:
            cv2.imshow("image", image)
        elif cropping:
            cv2.rectangle(imagegui, (x_start_crop, y_start_crop), (x_end_crop, y_end_crop), (255, 0, 0), 2)
            cv2.imshow("image", imagegui)
        if initialCrop:
            break
        if cv2.waitKey(1) == 27:
            exit()

    if x_end_crop < x_start_crop:
        x_start_crop = x_start_crop+x_end_crop
        x_end_crop = x_start_crop-x_end_crop
        x_start_crop = x_start_crop-x_end_crop
    if y_end_crop < y_start_crop:
        y_start_crop = y_start_crop+y_end_crop
        y_end_crop = y_start_crop-y_end_crop
        y_start_crop = y_start_crop-y_end_crop
    refPoint = [(x_start_crop, y_start_crop), (x_end_crop, y_end_crop)]
    if len(refPoint) == 2:  # when two points were found
        croppedimg = image[refPoint[0][1]:refPoint[1][1], refPoint[0][0]:refPoint[1][0]]

    cv2.namedWindow("Cropped image")
    cv2.setWindowProperty("Cropped image", cv2.WND_PROP_TOPMOST, 1)
    cv2.moveWindow("Cropped image", 960,20)
    cv2.setMouseCallback("image", mouse_crop_adjust)
    while True:
        imagegui = image.copy()
        cv2.rectangle(imagegui, (x_start_crop, y_start_crop), (x_end_crop, y_end_crop), (255, 0, 0), 2)
        cv2.circle(imagegui, (x_start_crop,y_start_crop), 5, (0,255,0), -1)
        cv2.circle(imagegui, (x_end_crop,y_end_crop), 5, (0,255,0), -1)
        cv2.imshow("image", imagegui)
        try:
            cv2.imshow("Cropped image", croppedimg)
        except:
            pass
        key = cv2.waitKey(1)
        if key == 27:
            exit()
        if key == ord('c'):
            break
    cv2.destroyAllWindows()
    height, width, _ = croppedimg.shape
    if height >= imgSize:
        croppedimg = cv2.resize(croppedimg, (width-(width%imgSize), height-(height%imgSize)), interpolation=cv2.INTER_NEAREST)
        cv2.imwrite("result.png", croppedimg)
    else:
        cv2.imwrite("result.png", np.zeros((imgSize, imgSize, 3), dtype=np.uint8))

# Function definitions from ev3Functions.py
def moveXmotor(Xmotor, location, safeDistance, brakee=True, keepDistance=False):
    Xmotor.start_move_to(location + safeDistance, speed=100, brake=brakee)
    while Xmotor.busy: pass
    if not keepDistance:
        Xmotor.start_move_to(location, speed=5, brake=brakee)
        while Xmotor.busy: pass

def moveYmotor(Ymotor, location, Ydistance, useYdistance=False, brakee=True):
    if useYdistance:
        Ymotor.start_move_to(location + Ydistance, speed=100, brake=brakee)
        while Ymotor.busy: pass
        Ymotor.start_move_to(location, speed=5, brake=brakee)
        while Ymotor.busy: pass
    else:
        Ymotor.start_move_to(location, speed=100, brake=brakee)
        while Ymotor.busy: pass

def pickPixel(Zmotor, Zbottom, Ztop, Zdistance, brakee=True):
    retry = True
    while retry:
        retry = False
        Zmotor.start_move_to(Zdistance, speed=75, brake=brakee)
        while Zmotor.busy: pass
        Zmotor.start_move_to(Zbottom, speed=25, brake=brakee)
        while Zmotor.busy:
            if cv2.waitKey(1) == ord('s'):
                retry = True
                Zmotor.start_move_to(Ztop, speed=100, brake=brakee)
                while cv2.waitKey(1) != ord('c'): pass
        sleep(0.5)
        Zmotor.start_move_to(Ztop, speed=100, brake=brakee)
        while Zmotor.busy: pass

def placePixel(Zmotor, Xmotor, Ymotor, Zbottom, Ztop, Zdistance, Xposition, Yposition, safeDistance, brakee=True):
    if Yposition < 0: Ymotor.start_move_to(Yposition - safeDistance, speed=20, brake=brakee)
    while Ymotor.busy: pass
    Zmotor.start_move_to(Zdistance, speed=50, brake=brakee)
    while Zmotor.busy: pass
    Xmotor.start_move_to(Xposition, speed=5, brake=brakee)
    if Yposition < 0: Ymotor.start_move_to(Yposition, speed=10, brake=brakee)
    while Xmotor.busy: pass
    while Ymotor.busy: pass
    Zmotor.start_move_to(Zbottom, speed=25, brake=brakee)
    while Zmotor.busy: pass
    sleep(0.5)
    Zmotor.start_move_to(Ztop, speed=100, brake=brakee)
    while Zmotor.busy: pass

def resetZAxis(Zmotor):
    Zmotor.start_move(speed=10)
    sleep(3)
    Zmotor.position = 0
    Zmotor.start_move_to(position=-90, speed=25, brake=True)
    while Zmotor.busy: pass
    Zmotor.position = 0

def resetXAxis(Xmotor, XTouch, Xstart, Xdistance):
    if not XTouch.touched:
        Xmotor.start_move(speed=75)
        while not XTouch.touched: pass
        Xmotor.stop()
    Xmotor.start_move_by(-175, speed=25, brake=True)
    while Xmotor.busy: pass
    Xmotor.start_move(speed=5)
    while not XTouch.touched: pass
    Xmotor.stop(brake=True)
    sleep(0.25)
    Xmotor.position = 0
    moveXmotor(Xmotor, Xstart, Xdistance)
    sleep(0.25)
    Xmotor.position = 0

def resetYAxis(Ymotor, YTouch, Ystart, Ydistance):
    if not YTouch.touched:
        Ymotor.start_move(speed=100)
        while not YTouch.touched: pass
        Ymotor.stop(brake=True)
    Ymotor.start_move_by(-250, speed=100, brake=True)
    while Ymotor.busy: pass
    Ymotor.start_move(speed=10)
    while not YTouch.touched: pass
    Ymotor.stop(brake=True)
    sleep(0.25)
    Ymotor.position = 0
    moveYmotor(Ymotor, Ystart, -Ydistance, useYdistance=True)
    sleep(0.25)
    Ymotor.position = 0

# Main code starts here
# Create an image for the machine. Saved as "result.jpg"
if useAI:
    AIfilename = "AIresult.png"
    print(f'\nGenerating image from prompt: "{object}"\n')
    imageGenerator.AIGenerator(object, AIfilename)
    imageFunctions.confirm_image(imgSize, object, AIfilename)
else:
    print(f'\nGetting image from path: "{filename}"\n')
    imageCropper.ImgCropper(filename, imgSize)

# Read the input image
original_image = cv2.imread("result.png")

# Pixelate the image
if usepixelation:
    pixelated_image = imageFunctions.pixelate_image(original_image, imgSize)
else:
    pixelated_image = cv2.resize(original_image, (32, 32), interpolation=cv2.INTER_AREA)
cv2.imwrite("pixelart.png", cv2.resize(pixelated_image, (256, 256), interpolation=cv2.INTER_NEAREST))

# Turn it into Lego colors
simplified_image, recipe = imageFunctions.simplify_image(pixelated_image, colors_bgr)
cv2.imwrite("pixelart Lego.png", cv2.resize(simplified_image, (256, 256), interpolation=cv2.INTER_NEAREST))

# Printing the required bricks
print("Image created.\n\nRequired bricks:")
print("----------------------------")
for i in recipe: print(f"{i:<18}| {recipe[i]:>3} pcs.")
print("----------------------------")

# Display the original and pixelated images
cv2.imshow("Original Image", cv2.resize(original_image, (512, 512), interpolation=cv2.INTER_NEAREST))
cv2.setWindowProperty("Original Image", cv2.WND_PROP_TOPMOST, 1)
cv2.moveWindow("Original Image", 136,200)
cv2.imshow("Pixelated Image", cv2.resize(pixelated_image, (512, 512), interpolation=cv2.INTER_NEAREST))
cv2.setWindowProperty("Pixelated Image", cv2.WND_PROP_TOPMOST, 1)
cv2.moveWindow("Pixelated Image", 698,200)
if useOverlay: cv2.imshow("Final Image", blend_modes.multiply(np.dstack((cv2.resize(simplified_image, (512, 512), interpolation=cv2.INTER_NEAREST), np.ones((512, 512, 1), dtype=float))), legoOverlay, 1).astype(np.uint8))
else: cv2.imshow("Final Image", cv2.resize(simplified_image, (512, 512), interpolation=cv2.INTER_NEAREST))
cv2.setWindowProperty("Final Image", cv2.WND_PROP_TOPMOST, 1)
cv2.moveWindow("Final Image", 1260,200)

# Asking for confirmation
print('Press "C" to Confirm.\n')
while True:
    if cv2.waitKey(1) == ord('c'): break
cv2.destroyAllWindows()

# Creating empty white image
current_image = np.full((int(imgSize), int(imgSize), 3), 255, dtype='uint8')

# Display the targeted and current image
if useOverlay: cv2.imshow("Current Image", blend_modes.multiply(np.dstack((cv2.resize(current_image, (512, 512), interpolation=cv2.INTER_NEAREST), np.ones((512, 512, 1), dtype=float))), legoOverlay, 1).astype(np.uint8))
else: cv2.imshow("Current Image", cv2.resize(current_image, (512, 512), interpolation=cv2.INTER_NEAREST))
cv2.setWindowProperty("Current Image", cv2.WND_PROP_TOPMOST, 1)
cv2.moveWindow("Current Image", 417,200)
if useOverlay: cv2.imshow("Targeted Image", blend_modes.multiply(np.dstack((cv2.resize(simplified_image, (512, 512), interpolation=cv2.INTER_NEAREST), np.ones((512, 512, 1), dtype=float))), legoOverlay, 1).astype(np.uint8))
else: cv2.imshow("Targeted Image", cv2.resize(simplified_image, (512, 512), interpolation=cv2.INTER_NEAREST))
cv2.setWindowProperty("Targeted Image", cv2.WND_PROP_TOPMOST, 1)
cv2.moveWindow("Targeted Image", 979,200)

# Starting main loop
print('Starting...\nPress "A" to Abort code early.\n')
coords = list((int(0),int(0)))
while True:

    # Get current pixel color
    current_color = list(simplified_image[imgSize-coords[1]-1, coords[0]])
    
    # Get current color index
    current_color_index = list(colors_bgr.values()).index((current_color[0], current_color[1], current_color[2]))

    # Check if current pixel color isn't white
    if current_color != list((255,255,255)):

        # Checking whether the desired color is present
        current_color_name = list(colors_bgr.keys())[list(colors_bgr.values()).index((current_color[0], current_color[1], current_color[2]))]
        if colors_stock[current_color_name] > 0:
            colors_stock[current_color_name] -= 1

        # Ask for refill if needed
        else:
            print("Please refill all colors, because", current_color_name, 'is almost empty.\nPress "F" to finish fill.')
            while True:
                if cv2.waitKey(1) == ord('f'): break
            for x in colors_stock:
                colors_stock[x] = color_amount
            print("Resetting Z-Axis...")
            print("Resetting X-Axis...")

        # Update current image
        current_image[imgSize-coords[1]-1, coords[0]] = current_color
        if useOverlay: cv2.imshow("Current Image", blend_modes.multiply(np.dstack((cv2.resize(current_image, (512, 512), interpolation=cv2.INTER_NEAREST), np.ones((512, 512, 1), dtype=float))), legoOverlay, 1).astype(np.uint8))
        else: cv2.imshow("Current Image", cv2.resize(current_image, (512, 512), interpolation=cv2.INTER_NEAREST))

    # Going to the next pixel
    if coords[0] < 31: coords[0] += 1
    else: coords[0] = 0; coords[1] += 1

    # Checking whether the code should be ended
    if cv2.waitKey(1) == ord('a'): break
    if coords[1] == 32: break
cv2.destroyAllWindows()