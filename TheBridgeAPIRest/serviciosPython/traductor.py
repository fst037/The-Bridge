import sys
from googletrans import Translator

def traducir(text, lang):
    translator = Translator()
    return translator.translate(text, dest=lang).text


def main():
    text = sys.argv[1]
    lang = sys.argv[2]
    print(traducir(text, lang))
    return traducir(text, lang)

main()

