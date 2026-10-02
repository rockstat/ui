NAME := ui
REPO := rockstat/$(NAME)
BASE_PATH ?= /ui

build_image:
	docker build --build-arg BASE_PATH=$(BASE_PATH) -t $(NAME) .

build_amd64:
	docker buildx build --platform linux/amd64 --build-arg BASE_PATH=$(BASE_PATH) -t $(NAME) --load .

push-latest:
	docker tag $(NAME) $(REPO):latest
	docker push $(REPO):latest

run:
	docker run --rm -it -p 3002:3000 --env-file .env.local -e NEXT_PUBLIC_BASE_PATH=$(BASE_PATH) --name $(NAME) $(NAME)
