"""Generate the student QR image for the published quiz URL.

Requires ReportLab and Pillow. The published site itself has no Python dependency.
"""

from pathlib import Path

from PIL import Image, ImageDraw
from reportlab.graphics.barcode.qr import QrCodeWidget


QUIZ_URL = "https://alexbernardino.github.io/regularization-quiz/"
OUTPUT = Path(__file__).resolve().parent.parent / "regularization-quiz-qr.png"
MODULE_PIXELS = 16
QUIET_ZONE_MODULES = 4


def main() -> None:
    qr = QrCodeWidget(QUIZ_URL, barLevel="Q").qr
    qr.make()

    modules = qr.getModuleCount()
    side = (modules + 2 * QUIET_ZONE_MODULES) * MODULE_PIXELS
    image = Image.new("1", (side, side), 1)
    draw = ImageDraw.Draw(image)

    for row in range(modules):
        for column in range(modules):
            if qr.isDark(row, column):
                x = (column + QUIET_ZONE_MODULES) * MODULE_PIXELS
                y = (row + QUIET_ZONE_MODULES) * MODULE_PIXELS
                draw.rectangle((x, y, x + MODULE_PIXELS - 1, y + MODULE_PIXELS - 1), fill=0)

    image.save(OUTPUT, optimize=True)
    print(f"Created {OUTPUT} ({side} × {side} px) for {QUIZ_URL}")


if __name__ == "__main__":
    main()
