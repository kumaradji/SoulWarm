# setup_webhook.py
import requests

TELEGRAM_BOT_TOKEN = '7289275372:AAGDhyO9xRWsO2s55qfcEjr-b0RKJXA2QMM'
WEBHOOK_URL = 'https://ceea-2a00-1fa0-866c-282c-b4a3-321d-3ea7-5bde.ngrok-free.app/telegram-webhook/'

response = requests.get(f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/setWebhook?url={WEBHOOK_URL}')
print(response.json())
