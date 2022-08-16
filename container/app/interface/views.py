# Django imports
from django.shortcuts import render

import os

# @ensure_csrf_cookie
def home_page(request):
    js_files = os.listdir(path=os.path.join(".","interface", "static", "javascript"))
    the_react_file = [x for x in js_files if x.endswith('.js')][0]
    js_files = os.listdir(path=os.path.join(".", "interface", "static", "css"))
    the_style_file = [x for x in js_files if x.endswith('.css')][0]
    Context = {'react_file': the_react_file, 'style_file': the_style_file}

    return render(request, os.path.join('interface','homepage.html'), Context)