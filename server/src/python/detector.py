import sys
from glasses_detector import GlassesClassifier

classifier = GlassesClassifier(kind="anyglasses", device=None)

def main(path):
    # print(f"Starting to detect glasses from {path}")
    predictions = classifier.process_file(path)

    if predictions == "present":
        # print(f"Glasses detected in {path}")
        sys.exit(1)
    else:
        # print(f"No glasses detected in {path}")
        sys.exit(0)

if __name__ == '__main__':
    if len(sys.argv) != 2:
        # print("Usage: python3 glasses_detector.py <imagePath>")
        sys.exit(1)
    
    image_path = sys.argv[1]
    result = main(image_path)
    sys.exit(result)
