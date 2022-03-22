from .serializers import GroupSerializer, MemberSerializer
from .models import Group, Member
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse


@csrf_exempt
def group_api(request, pk=0):
    if request.method == 'GET':
        groups = Group.objects.all()
        groups_serializer = GroupSerializer(groups, many=True)
        return JsonResponse(groups_serializer.data, safe=False)
    elif request.method == 'POST':
        group_data = JSONParser().parse(request)
        groups_serializer = GroupSerializer(data=group_data)
        if groups_serializer.is_valid():
            groups_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        group_data = JSONParser().parse(request)
        group = Group.objects.get(group_id=group_data['group_id'])
        groups_serializer = GroupSerializer(group, data=group_data)
        if groups_serializer.is_valid():
            groups_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        group = Group.objects.get(group_id=pk)
        group.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def member_api(request, pk=0):
    if request.method == 'GET':
        members = Member.objects.all()
        members_serializer = MemberSerializer(members, many=True)
        return JsonResponse(members_serializer.data, safe=False)
    elif request.method == 'POST':
        member_data = JSONParser().parse(request)
        members_serializer = MemberSerializer(data=member_data)
        if members_serializer.is_valid():
            members_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        member_data = JSONParser().parse(request)
        member = Member.objects.get(id=member_data['id'])
        members_serializer = MemberSerializer(member, data=member_data)
        if members_serializer.is_valid():
            members_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        member = Member.objects.get(id=pk)
        member.delete()
        return JsonResponse("Deleted Successfully", safe=False)
