from django.shortcuts import render
from .models import User
from .serializers import RegisterSerializer , UserlistSerializer , LoginSerializer , UserprofileSerializer

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view , permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def register_view(request):
        serializer = RegisterSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data , status=status.HTTP_201_CREATED)
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
        
    

@api_view(['GET'])
def User_list_view(request):
    users = User.objects.all()
    serializer = UserlistSerializer(users , many=True)
    return Response(serializer.data , status=status.HTTP_200_OK)


@api_view(['POST'])
def Login_view(request):
     serializer = LoginSerializer(data = request.data)
     if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            try:
                user = User.objects.get(email=email)
                if user.check_password(password):
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

     return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
     

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
     user = request.user
     serializer = UserprofileSerializer(user)
     return Response(
          {
               'status':'success',
               'message' : "user fetched successfully",
               'data':serializer.data
          },
          status=status.HTTP_200_OK
     )

     