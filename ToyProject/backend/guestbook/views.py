import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from .models import *

@require_http_methods(["GET", "POST"])
def guestbook_list_and_post(request):

    # 방명록 전체 조회
    if request.method == "GET":
        guestbook_all = Guestbook.objects.all().order_by('-date')
        guestbook_json_all = []
        for guestbook in guestbook_all:
            guestbook_detail_json = {
                "title": guestbook.title,
                "id": guestbook.id,
                "writer": guestbook.writer,
                "content": guestbook.content,
                "date": guestbook.date,
            }
            guestbook_json_all.append(guestbook_detail_json)

        return JsonResponse({
            'status': 200,
            'message': "방명록 목록 조회 성공",
            'data': guestbook_json_all,
        })

    # 방명록 작성
    elif request.method == "POST":
        data = json.loads(request.body)
        title = data.get("title")
        writer = data.get("writer")
        content = data.get("content")
        password = data.get("password")

        new_guestbook = Guestbook.objects.create(
            title=title,
            writer=writer,
            content=content,
            password=password
        )

        return JsonResponse({
            "status": 200,
            "message": "방명록 작성 성공",
            "data": {
                "id": new_guestbook.id,
                "title": new_guestbook.title,
                "writer": new_guestbook.writer,
                "content": new_guestbook.content,
                "date": new_guestbook.date,
            }
        })


# 방명록 삭제
@require_http_methods(["DELETE"])
def guestbook_delete(request, guestbook_id):
    data = json.loads(request.body)
    password = data.get("password")

    guestbook = get_object_or_404(Guestbook, pk=guestbook_id)

    if password == guestbook.password:
        guestbook.delete()
        return JsonResponse({
            "status": 200,
            "message": "방명록 삭제 성공",
            "data": None
        })
    else:
        return JsonResponse({
            "status": 403,
            "message": "비밀번호가 일치하지 않습니다.",
            "data": None
        })
