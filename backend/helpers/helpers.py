from rest_framework.response import Response

class BaseResponse():
    def __init__(self,result=None, data_message=None ,message="Success", code=200) -> None:
        self.code = code
        self.result = result
        self.message = message
        self.data_message = data_message
        self.total_data = None
        self.total_page = None
        self.page = None
        self.limit = None

    def json(self):
        pagination = {"total_data": self.total_data, "total_page": self.total_page, "page": self.page,
                      "limit": self.limit} if self.total_data else {}
        
        self.result = self.result if self.result else []
        
        response = {
            "status": {
                "code": self.code,
                "message": self.message
            },
            "data":{
                "message": self.data_message,
                "result": self.result,

            },
            "pagination": pagination
        }

        return Response(response)