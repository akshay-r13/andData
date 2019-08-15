try:
    from PIL import Image
except ImportError:
    import Image
import pytesseract
import detectlanguage
from googletrans import Translator

detectlanguage.configuration.api_key = "bbb385a240d1d4761d5acf77358ce7eb"
# pytesseract.pytesseract.tesseract_cmd = r"C:\Users\Akshay\AppData\Local\Tesseract-OCR\tesseract.exe"

def ocr_core(filename):
    """
    This function will handle the core OCR processing of images.
    """
    # with open(filename,'r') as file:
    #         text_content = file.read().splitlines()
    #     final_text = str(text_content)+" "
    text = pytesseract.image_to_string(Image.open(filename), lang="tam")  # We'll use Pillow's Image class to open the image and pytesseract to detect the string in the image
    result = detectlanguage.detect(text)
    # detected_language, detected_language_reliance = result['language'], result['isReliable']
    translator = Translator()
    trans_text = translator.translate([text])
    translated_text = []
    for ele in trans_text:
        translated_text.append(ele.text)
        #print(ele.origin,' -> ',ele.text)
    print(translated_text)
    return text, translated_text