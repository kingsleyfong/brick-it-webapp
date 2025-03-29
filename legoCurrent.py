import numpy as np
import trimesh
import pyvista as pv
from pyvistaqt import QtInteractor
from PyQt5.QtWidgets import (QApplication, QFileDialog, QMainWindow, QPushButton, QMessageBox,
                            QSlider, QVBoxLayout, QHBoxLayout, QWidget, QLabel, QProgressBar, QFrame)
from PyQt5.QtCore import Qt, QThread, pyqtSignal, QTimer
import sys
import os

class STLProcessingThread(QThread):
    """Thread for processing STL files to avoid UI freezing."""
    progress_signal = pyqtSignal(int)
    finished_signal = pyqtSignal(object, object, object, object, object, object)
    
    def __init__(self, mesh, voxel_size, stl_file_path):
        super().__init__()
        self.mesh = mesh
        self.voxel_size = voxel_size
        self.stl_file_path = stl_file_path  # Store the STL file path
        
    def run(self):
        # Update progress - Voxelization starting
        self.progress_signal.emit(5)
        
        # Voxelize the mesh
        voxel_grid = self.mesh.voxelized(pitch=self.voxel_size)
        voxel_matrix = voxel_grid.matrix.astype(bool)
        
        # Update progress - Voxelization complete
        self.progress_signal.emit(30)
        
        if voxel_matrix.size == 0:
            print("Warning: Voxel grid is empty.")
            return
        
        # Get origin
        origin = self.mesh.bounds[0]
        
        # Update progress - Starting LEGO brick generation
        self.progress_signal.emit(40)
        
        # Generate LEGO bricks
        lego_bricks, support_bricks = self.generate_lego_bricks(voxel_matrix, origin, self.voxel_size)
        
        # Update progress - LEGO brick generation complete
        self.progress_signal.emit(70)
        
        # Export coordinates
        self.export_voxel_coordinates(voxel_matrix, origin, self.voxel_size)
        
        # Update progress - Coordinates exported, preparing visualization
        self.progress_signal.emit(80)
        
        # Signal completion with results
        self.finished_signal.emit(voxel_grid, voxel_matrix, lego_bricks, support_bricks, origin, self.voxel_size)
    
    def generate_lego_bricks(self, voxel_matrix, origin, voxel_size):
        """Generate LEGO bricks from voxel matrix."""
        # Create empty lists for bricks and studs
        bricks = []
        studs = []
        support_bricks = []
        
        # Get dimensions of voxel matrix
        x_dim, y_dim, z_dim = voxel_matrix.shape
        
        # Create a matrix to track support bricks
        support_matrix = np.zeros_like(voxel_matrix, dtype=bool)
        
        # Identify support bricks
        for x in range(x_dim):
            for y in range(y_dim):
                filled_indices = np.where(voxel_matrix[x, y, :])[0]
                if len(filled_indices) > 0:
                    lowest_z = filled_indices[0]
                    for z in range(lowest_z):
                        support_matrix[x, y, z] = True
        
        # Generate model bricks
        for z in range(z_dim):
            for y in range(y_dim):
                for x in range(x_dim):
                    if voxel_matrix[x, y, z]:
                        # Create a brick at this position
                        brick = self.create_lego_brick(origin, x, y, z, voxel_size)
                        bricks.append(brick)
                        
                        # Create a stud on top of the brick
                        stud = self.create_lego_stud(origin, x, y, z, voxel_size)
                        studs.append(stud)
        
        # Generate support bricks
        for z in range(z_dim):
            for y in range(y_dim):
                for x in range(x_dim):
                    if support_matrix[x, y, z] and not voxel_matrix[x, y, z]:
                        # Create a support brick at this position
                        support_brick = self.create_lego_brick(origin, x, y, z, voxel_size)
                        support_bricks.append(support_brick)
        
        return [bricks, studs], support_bricks
    
    def create_lego_brick(self, origin, x, y, z, voxel_size):
        """Create a LEGO brick at the specified position."""
        # LEGO brick dimensions (slightly smaller than voxel for visualization)
        brick_size = voxel_size * 0.95
        
        # Calculate position
        pos_x = origin[0] + x * voxel_size
        pos_y = origin[1] + y * voxel_size
        pos_z = origin[2] + z * voxel_size
        
        # Create brick
        brick = pv.Cube(center=(pos_x + voxel_size/2, pos_y + voxel_size/2, pos_z + voxel_size/2), 
                       x_length=brick_size, y_length=brick_size, z_length=brick_size)
        return brick
    
    def create_lego_stud(self, origin, x, y, z, voxel_size):
        """Create a LEGO stud at the specified position."""
        # LEGO stud dimensions
        stud_radius = voxel_size * 0.2
        stud_height = voxel_size * 0.1
        
        # Calculate position
        pos_x = origin[0] + x * voxel_size + voxel_size/2
        pos_y = origin[1] + y * voxel_size + voxel_size/2
        pos_z = origin[2] + z * voxel_size + voxel_size
        
        # Create stud
        stud = pv.Cylinder(center=(pos_x, pos_y, pos_z + stud_height/2), 
                          direction=(0, 0, 1), radius=stud_radius, height=stud_height)
        return stud
    
    def export_voxel_coordinates(self, voxel_matrix, origin, voxel_size):
        """Export voxel coordinates to a text file."""
        # Extract the base name of the STL file and create the custom TXT file name
        base_name = os.path.splitext(os.path.basename(self.stl_file_path))[0]
        txt_file_name = f"{base_name}_lego.txt"

        # Get dimensions of voxel matrix
        x_dim, y_dim, z_dim = voxel_matrix.shape
        
        # Create a matrix to track support bricks
        support_matrix = np.zeros_like(voxel_matrix, dtype=bool)
        
        # Identify support bricks
        for x in range(x_dim):
            for y in range(y_dim):
                filled_indices = np.where(voxel_matrix[x, y, :])[0]
                if len(filled_indices) > 0:
                    lowest_z = filled_indices[0]
                    for z in range(lowest_z):
                        support_matrix[x, y, z] = True
        
        # Create output file
        with open(txt_file_name, "w") as f:
            f.write("# LEGO Coordinates (X, Y, Z, Type)\n")
            f.write("# Type: 1 = Model Brick, 2 = Support Brick\n")
            
            # Write model brick coordinates
            for z in range(z_dim):
                for y in range(y_dim):
                    for x in range(x_dim):
                        if voxel_matrix[x, y, z]:
                            # Convert to LEGO coordinates (1-based)
                            lego_x = int(round((origin[0] + x * voxel_size) / voxel_size)) + 1
                            lego_y = int(round((origin[1] + y * voxel_size) / voxel_size)) + 1
                            lego_z = z + 1
                            
                            # Write to file if within buildable area
                            if 1 <= lego_x <= 16 and 1 <= lego_y <= 16 and 1 <= lego_z <= 10:
                                f.write(f"{lego_x}, {lego_y}, {lego_z}, 1\n")
            
            # Write support brick coordinates
            for z in range(z_dim):
                for y in range(y_dim):
                    for x in range(x_dim):
                        if support_matrix[x, y, z] and not voxel_matrix[x, y, z]:
                            # Convert to LEGO coordinates (1-based)
                            lego_x = int(round((origin[0] + x * voxel_size) / voxel_size)) + 1
                            lego_y = int(round((origin[1] + y * voxel_size) / voxel_size)) + 1
                            lego_z = z + 1
                            
                            # Write to file if within buildable area
                            if 1 <= lego_x <= 16 and 1 <= lego_y <= 16 and 1 <= lego_z <= 10:
                                f.write(f"{lego_x}, {lego_y}, {lego_z}, 2\n")
        
        # Print confirmation message to terminal
        print(f"LEGO coordinates exported successfully to '{txt_file_name}'")
        print(f"File saved in: {os.path.abspath(txt_file_name)}")

class LegoSlicerApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.initUI()
        
    def initUI(self):
        self.setWindowTitle("LEGOized Slicer")
        # Start in normal windowed mode with a reasonable size
        self.resize(1200, 800)
        
        # Create central widget
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        
        # Main layout with header and viewports
        main_layout = QVBoxLayout(central_widget)
        main_layout.setContentsMargins(10, 10, 10, 10)
        
        # Header bar with controls
        header_bar = QWidget()
        header_layout = QHBoxLayout(header_bar)
        header_layout.setContentsMargins(0, 0, 0, 10)
        
        # STL file selection button
        self.select_stl_button = QPushButton("Choose STL File", self)
        self.select_stl_button.setMinimumWidth(120)
        self.select_stl_button.clicked.connect(self.select_stl_file)
        header_layout.addWidget(self.select_stl_button)
        
        # Scale label
        scale_label = QLabel("Scale Factor:")
        header_layout.addWidget(scale_label)
        
        # Scale slider
        self.scale_slider = QSlider(Qt.Horizontal)
        self.scale_slider.setMinimum(1)  # 0.1x
        self.scale_slider.setMaximum(100)  # 10.0x
        self.scale_slider.setValue(10)  # 1.0x (default)
        self.scale_slider.setTickPosition(QSlider.TicksBelow)
        self.scale_slider.setTickInterval(10)
        self.scale_slider.valueChanged.connect(self.update_scale_label)
        header_layout.addWidget(self.scale_slider, 1)  # Give slider more space
        
        # Scale value label
        self.scale_value_label = QLabel("1.0x")
        self.scale_value_label.setMinimumWidth(50)
        header_layout.addWidget(self.scale_value_label)
        
        # Scale button
        self.scale_button = QPushButton("SCALE", self)
        self.scale_button.setMinimumWidth(80)
        self.scale_button.clicked.connect(self.apply_scale)
        self.scale_button.setEnabled(False)  # Disabled until STL is loaded
        header_layout.addWidget(self.scale_button)
        
        # Reset View button (replacing Fullscreen button)
        self.reset_view_button = QPushButton("Reset View", self)
        self.reset_view_button.setMinimumWidth(80)
        self.reset_view_button.clicked.connect(self.reset_all_views)
        header_layout.addWidget(self.reset_view_button)
        
        # Add header to main layout
        main_layout.addWidget(header_bar)
        
        # Progress bar
        self.progress_bar = QProgressBar()
        self.progress_bar.setVisible(False)  # Hide initially
        main_layout.addWidget(self.progress_bar)
        
        # Viewports container
        viewports_container = QWidget()
        self.viewports_layout = QHBoxLayout(viewports_container)
        self.viewports_layout.setContentsMargins(0, 0, 0, 0)
        main_layout.addWidget(viewports_container, 1)  # Give viewports more space
        
        # Create frames for each viewport
        self.viewport_frames = []
        self.viewport_plotters = []
        
        for i in range(3):
            # Create a frame to hold the viewport
            frame = QFrame()
            frame.setFrameShape(QFrame.StyledPanel)
            frame.setFrameShadow(QFrame.Raised)
            frame.setMinimumSize(300, 300)
            
            # Create a layout for the frame
            frame_layout = QVBoxLayout(frame)
            frame_layout.setContentsMargins(0, 0, 0, 0)
            
            # Create a PyVista QtInteractor for this frame
            plotter = QtInteractor(frame)
            # Set background color to light grey
            plotter.set_background('lightgrey')
            frame_layout.addWidget(plotter)
            
            # Add to layouts and lists
            self.viewports_layout.addWidget(frame)
            self.viewport_frames.append(frame)
            self.viewport_plotters.append(plotter)
        
        # Set up initial buildplates
        self.setup_initial_viewports()
        
        # Initialize variables
        self.stl_file = None
        self.mesh = None
        self.original_mesh = None
        self.current_scale = 1.0
    
    def setup_initial_viewports(self):
        """Set up initial empty viewports with buildplates."""
        viewport_titles = ["Original STL Model", "Voxelized Model", "LEGOized Model"]
        
        for i, plotter in enumerate(self.viewport_plotters):
            # Add buildplate
            buildplate = self.create_lego_buildplate()
            plotter.add_mesh(buildplate, color="gray", opacity=0.5)
            
            # Add axes
            plotter.show_axes()
            self.add_origin_axes(plotter)
            
            # Add title
            plotter.add_text(viewport_titles[i], position='upper_left')
            
            # Reset camera
            plotter.view_isometric()
            plotter.reset_camera()
    
    def link_viewport_cameras(self):
        """Link the camera views of all viewports."""
        # Get the camera position from the first viewport
        camera_pos = self.viewport_plotters[0].camera_position
        
        # Apply to other viewports
        for plotter in self.viewport_plotters[1:]:
            plotter.camera_position = camera_pos
    
    def update_scale_label(self):
        """Update the scale label when the slider changes."""
        scale_value = self.scale_slider.value() / 10.0
        self.scale_value_label.setText(f"{scale_value:.1f}x")
    
    def apply_scale(self):
        """Apply the selected scale to the STL model."""
        if not self.original_mesh:
            return
        
        # Get scale value
        scale_value = self.scale_slider.value() / 10.0
        self.current_scale = scale_value
        
        # Create a copy of the original mesh
        self.mesh = self.original_mesh.copy()
        
        # Apply scale
        self.mesh.apply_scale(scale_value)
        
        # Place on buildplate
        self.place_on_buildplate()
        
        # Process the model
        self.process_model()
    
    def select_stl_file(self):
        """Open a file dialog to select an STL file."""
        file_path, _ = QFileDialog.getOpenFileName(self, "Open STL File", "", "STL Files (*.stl)")
        if file_path:
            self.stl_file = file_path
            # Load the mesh
            self.mesh = trimesh.load_mesh(file_path, process=True)
            # Convert from mm to cm (STL files typically use mm)
            self.mesh.apply_scale(0.1)
            # Store original mesh for scaling operations
            self.original_mesh = self.mesh.copy()
            # Enable scale button
            self.scale_button.setEnabled(True)
            # Place on buildplate without scaling
            self.place_on_buildplate()
            # Process the model
            self.process_model()
    
    def place_on_buildplate(self):
        """Centers the STL model and places it on the buildplate without scaling."""
        if self.mesh:
            # Center the model in X and Y
            centroid = self.mesh.centroid
            self.mesh.apply_translation([-centroid[0], -centroid[1], 0])
            
            # Move to center of buildplate
            self.mesh.apply_translation([6.4, 6.4, 0])
            
            # Ensure model sits on buildplate
            min_z = self.mesh.bounds[0][2]
            self.mesh.apply_translation([0, 0, -min_z + 0.16])
    
    def create_lego_buildplate(self):
        """Creates a 16x16 LEGO build plate with real-world dimensions."""
        buildplate = pv.Plane(center=(6.4, 6.4, 0), i_size=12.8, j_size=12.8)
        return buildplate
    
    def process_model(self):
        """Process the STL model in a separate thread with progress updates."""
        if not self.mesh:
            return
        
        # Show progress bar
        self.progress_bar.setValue(0)
        self.progress_bar.setVisible(True)
        
        # Create and start processing thread, passing the STL file path
        self.processing_thread = STLProcessingThread(self.mesh, voxel_size=0.78, stl_file_path=self.stl_file)
        self.processing_thread.progress_signal.connect(self.update_progress)
        self.processing_thread.finished_signal.connect(self.display_processed_model)
        self.processing_thread.start()
    
    def update_progress(self, value):
        """Update the progress bar."""
        self.progress_bar.setValue(value)
    
    def display_processed_model(self, voxel_grid, voxel_matrix, lego_bricks, support_bricks, origin, voxel_size):
        """Display the processed model in the 3D viewports."""
        # Update progress - Starting to render models
        self.progress_bar.setValue(85)
        
        # Check if model is too big for buildable area
        model_too_big = self.check_model_size(voxel_matrix, origin, voxel_size)
        
        # Count bricks
        model_bricks, support_bricks_count, outside_bricks = self.count_bricks(voxel_matrix, origin, voxel_size)
        total_bricks = model_bricks + support_bricks_count
        
        # Clear all viewports
        for plotter in self.viewport_plotters:
            plotter.clear()
            # Ensure background color is set to light grey
            plotter.set_background('lightgrey')
        
        # Update progress - Cleared viewports
        self.progress_bar.setValue(90)
        
        # Set up each viewport with a buildplate and axes
        for plotter in self.viewport_plotters:
            buildplate = self.create_lego_buildplate()
            plotter.add_mesh(buildplate, color="gray", opacity=0.5)
            plotter.show_axes()
            self.add_origin_axes(plotter)
        
        # Original Model Viewport
        plotter = self.viewport_plotters[0]
        pv_mesh = pv.wrap(self.mesh)
        plotter.add_mesh(pv_mesh, color="#39FF14", opacity=0.8)
        plotter.add_text("Original STL Model", position='upper_left')
        plotter.add_text(f"Scale: {self.current_scale:.1f}x", position='upper_right')
        
        # Update progress - Original model rendered
        self.progress_bar.setValue(93)
        
        # Voxelized Model Viewport
        plotter = self.viewport_plotters[1]
        voxel_points = voxel_grid.points
        plotter.add_points(voxel_points, color="red", point_size=10, render_points_as_spheres=True)
        # Add support voxel points
        support_points = np.array([origin + np.array([x, y, z]) * voxel_size for x, y, z in zip(*np.where(voxel_matrix)) if not np.any(voxel_matrix[x, y, :z])])
        if len(support_points) > 0:  # Check if there are any support points
            plotter.add_points(support_points, color="blue", point_size=10, render_points_as_spheres=True)
        plotter.add_text("Voxelized Model", position='upper_left')
        self.add_grid_overlay(plotter, voxel_grid)
        
        # Update progress - Voxelized model rendered
        self.progress_bar.setValue(96)
        
        # LEGOized Model Viewport
        plotter = self.viewport_plotters[2]
        for brick in lego_bricks[0]:
            plotter.add_mesh(brick, color="#4169E1", opacity=1.0)
        for stud in lego_bricks[1]:
            plotter.add_mesh(stud, color="black", opacity=1.0)
        # Add support bricks
        for support_brick in support_bricks:
            plotter.add_mesh(support_brick, color="black", opacity=1.0)
        plotter.add_text("LEGOized Model", position='upper_left')
        
        # Add brick count information at the bottom of the viewport
        brick_count_text = f"Total: {total_bricks} | Model: {model_bricks} | Support: {support_bricks_count}"
        plotter.add_text(brick_count_text, position=(0.05, 0.02), font_size=12, color='black', viewport=True)
        
        # Add warning if model is too big
        if model_too_big:
            plotter.add_text("MODEL SIZE TOO BIG - RENDER ISSUES", position='lower_left', color='red', font_size=14)
        
        # Update progress - LEGOized model rendered
        self.progress_bar.setValue(99)
        
        # Reset camera and update all viewports
        for plotter in self.viewport_plotters:
            plotter.reset_camera()
            plotter.update()
        
        # Link the camera views
        self.link_viewport_cameras()
        
        # Update progress - All rendering complete
        self.progress_bar.setValue(100)
        
        # Hide progress bar after a short delay
        QTimer.singleShot(500, lambda: self.progress_bar.setVisible(False))
    
    def add_origin_axes(self, plotter):
        """Add XYZ axis lines from the origin at the corner of the buildplate."""
        origin = [0, 0, 0]
        x_axis = pv.Line(origin, [12.8, 0, 0])
        y_axis = pv.Line(origin, [0, 12.8, 0])
        z_axis = pv.Line(origin, [0, 0, 12.8])
        plotter.add_mesh(x_axis, color="red", line_width=2)
        plotter.add_mesh(y_axis, color="green", line_width=2)
        plotter.add_mesh(z_axis, color="blue", line_width=2)
    
    def add_grid_overlay(self, plotter, voxel_grid):
        """Add a 3D grid overlay to the voxelized model viewport."""
        buildplate_size = 12.8
        x_range = np.arange(0, buildplate_size, 0.78)
        y_range = np.arange(0, buildplate_size, 0.78)
        z_range = np.arange(0, buildplate_size, 0.96)
        
        for x in x_range:
            for y in y_range:
                plotter.add_mesh(pv.Line((x, 0, 0), (x, 0, buildplate_size)), color="black", opacity=0.1)
                plotter.add_mesh(pv.Line((x, buildplate_size, 0), (x, buildplate_size, buildplate_size)), color="black", opacity=0.1)
        
        for y in y_range:
            for z in z_range:
                plotter.add_mesh(pv.Line((0, y, z), (buildplate_size, y, z)), color="black", opacity=0.1)
    
    def check_model_size(self, voxel_matrix, origin, voxel_size):
        """Check if any part of the model is outside the buildable area."""
        x_dim, y_dim, z_dim = voxel_matrix.shape
        for z in range(z_dim):
            for y in range(y_dim):
                for x in range(x_dim):
                    if voxel_matrix[x, y, z]:
                        lego_x = int(round((origin[0] + x * voxel_size) / voxel_size)) + 1
                        lego_y = int(round((origin[1] + y * voxel_size) / voxel_size)) + 1
                        lego_z = z + 1
                        if not (1 <= lego_x <= 16 and 1 <= lego_y <= 16 and 1 <= lego_z <= 10):
                            return True
        return False
    
    def count_bricks(self, voxel_matrix, origin, voxel_size):
        """Count model bricks, support bricks, and bricks outside buildable area."""
        x_dim, y_dim, z_dim = voxel_matrix.shape
        
        model_bricks = 0
        support_bricks = 0
        outside_bricks = 0
        
        # Create a matrix to track support bricks
        support_matrix = np.zeros_like(voxel_matrix, dtype=bool)
        
        # Identify support bricks
        for x in range(x_dim):
            for y in range(y_dim):
                filled_indices = np.where(voxel_matrix[x, y, :])[0]
                if len(filled_indices) > 0:
                    lowest_z = filled_indices[0]
                    for z in range(lowest_z):
                        support_matrix[x, y, z] = True
        
        # Count bricks
        for z in range(z_dim):
            for y in range(y_dim):
                for x in range(x_dim):
                    if voxel_matrix[x, y, z] or support_matrix[x, y, z]:
                        # Convert to LEGO coordinates
                        lego_x = int(round((origin[0] + x * voxel_size) / voxel_size)) + 1
                        lego_y = int(round((origin[1] + y * voxel_size) / voxel_size)) + 1
                        lego_z = z + 1
                        
                        if 1 <= lego_x <= 16 and 1 <= lego_y <= 16 and 1 <= lego_z <= 10:
                            if voxel_matrix[x, y, z]:
                                model_bricks += 1
                            else:
                                support_bricks += 1
                        else:
                            outside_bricks += 1
        
        return model_bricks, support_bricks, outside_bricks

    def reset_all_views(self):
        """Reset all viewport cameras to the default isometric view."""
        for plotter in self.viewport_plotters:
            plotter.reset_camera()
            # Set to isometric view
            plotter.view_isometric()
            plotter.update()

    def closeEvent(self, event):
        """Handle the window close event to properly clean up resources."""
        # Stop any running processing threads
        if hasattr(self, 'processing_thread') and self.processing_thread.isRunning():
            self.processing_thread.terminate()
            self.processing_thread.wait()
        
        # Clean up PyVista plotters
        for plotter in self.viewport_plotters:
            plotter.close()
            plotter.deep_clean()
        
        # Accept the close event
        event.accept()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = LegoSlicerApp()
    window.show()
    sys.exit(app.exec_())