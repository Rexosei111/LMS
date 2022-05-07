
from .serializers import StudentSerializer
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.permissions import AllowAny

# Create your views here.

@api_view(["POST"])
@permission_classes([AllowAny])
@parser_classes([JSONParser])
def RegisterStudent(request):
    data = request.data
    serialzer = StudentSerializer(data=data)
    if serialzer.is_valid():
        student = serialzer.save()
        return Response(status=200)
    else:
        return Response(serialzer.errors, 400)