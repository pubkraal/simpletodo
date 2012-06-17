from pyramid import request

from simpletodo.lib import security

def before_request(event):
    session = event.request.session

    if not 'csrf' in session:
        session['csrf'] = security.generate_token()
        session.save()

    if event.request.method.strip() == 'POST':
        POST = event.request.POST
        if POST.get('csrf', '') != session.get('csrf'):
            raise Exception('No CSRF token present or invalid')
