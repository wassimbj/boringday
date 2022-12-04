
ui:
	@cd client && ng serve -o


.PHONY: server
server:
	@cd server && npm.cmd start
