import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    JAMENDO_CLIENT_ID = os.environ.get("JAMENDO_CLIENT_ID", "")
    CACHE_TYPE = "SimpleCache"
    CACHE_DEFAULT_TIMEOUT = 600
    DEBUG = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
