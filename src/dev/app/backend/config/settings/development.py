from .base import *

DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.mysql', # MySQLを使用することを記述
    'NAME': 'app', # 使用するDBの設定
    'USER': 'root',
    'PASSWORD': 'password',
    'HOST': 'host.docker.internal', # ホストの設定
    'PORT': 53306, # ポートの設定
    'ATOMIC_REQUESTS': True # 処理の最後まで到達した場合にデータベースをcommit, Falseの場合はテーブル操作するたびcommit
  }
}