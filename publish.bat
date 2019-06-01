@echo off
setlocal enabledelayedexpansion

set currPath=%~dp0
set zhuyuPath=%currPath%Game_ZhuYu\
set ziyuPath=%currPath%Game_ZiYu\

REM 先判断是否已经打过包了
if not exist "%zhuyuPath%release" (
    echo "not found release, please publish use laya ide!"
    goto endPublish;
)
if not exist "%zhuyuPath%release" (
    echo "not found release, please publish use laya ide!"
    goto endPublish;
)

if exist "%currPath%wxgame" (
    rd /s /q "%currPath%wxgame"
)

REM 组建发布包
xcopy /s /i /y %zhuyuPath%release\wxgame\code.js %currPath%wxgame\
xcopy /s /i /y %zhuyuPath%release\wxgame\game.js %currPath%wxgame\
xcopy /s /i /y %zhuyuPath%release\wxgame\game.json %currPath%wxgame\
xcopy /s /i /y %zhuyuPath%release\wxgame\project.config.json %currPath%wxgame\
xcopy /s /i /y %zhuyuPath%release\wxgame\version.json %currPath%wxgame\
xcopy /s /i /y %zhuyuPath%release\wxgame\weapp-adapter.js %currPath%wxgame\

xcopy /s /i /y %ziyuPath%release\wxgame\code.js %currPath%wxgame\src\myOpenDataContext\
xcopy /s /i /y %ziyuPath%release\wxgame\weapp-adapter.js %currPath%wxgame\src\myOpenDataContext\
xcopy /s /i /y %ziyuPath%release\wxgame\game.js %currPath%wxgame\src\myOpenDataContext\
ren %currPath%wxgame\src\myOpenDataContext\game.js index.js

:endPublish
endlocal
@echo on
pause