import re
text=open('src/lib/analyzer.ts','r',encoding='utf-8').read()
match = re.search(r'(const PITCH_DECK_SYSTEM_PROMPT = `)(.*?)(\n`;\n\nexport async function analyzePitchDeckText)', text, re.DOTALL)
if match:
    prefix = match.group(1)
    prompt_content = match.group(2).replace('\\`', '`').replace('`', '\\`').replace('\\${', '${').replace('${', '\\${')
    new_text = text[:match.start()] + prefix + prompt_content + match.group(3) + text[match.end():]
    open('src/lib/analyzer.ts','w',encoding='utf-8').write(new_text)
    print('Fixed!')
