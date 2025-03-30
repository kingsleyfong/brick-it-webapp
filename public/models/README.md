# ONNX Models for Brick It

This directory contains ONNX models for the AI image generation functionality in Brick It.

## Required Files

The application looks for the following files:

- `tiny-stable-diffusion.onnx`: The text-to-image model
- `vocab.json`: The tokenizer vocabulary

## Adding Real Models

To use real AI image generation:

1. Download an ONNX-compatible text-to-image model (like Stable Diffusion)
2. Convert it to ONNX format if it's not already in that format
3. Optimize it for web use (reduce size, quantize, etc.)
4. Place the model file in this directory as `tiny-stable-diffusion.onnx`
5. Ensure your tokenizer vocabulary matches the model's requirements

## Resources

Some resources for finding and converting models:

- [ONNX Model Zoo](https://github.com/onnx/models)
- [Hugging Face Models](https://huggingface.co/models)
- [ONNX Runtime Web Examples](https://github.com/microsoft/onnxruntime-web-demo)

## Note on File Size

ONNX models for image generation can be large (100MB+). Consider:

1. Using model quantization to reduce size
2. Providing a CDN-hosted option for the model
3. Adding a download prompt before using AI features

For now, the app automatically falls back to a placeholder image generator when no model is present. 