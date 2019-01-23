from django.apps import AppConfig


class ImagesConfig(AppConfig):
    name = 'images'

    def ready(self):
        # 导入信号接收函数
        import images.signals
