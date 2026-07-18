@echo off
setlocal
pushd "%~dp0"
start "Computing Teacher Mastery server" /min python -m http.server 8080 --bind 127.0.0.1
start "" http://127.0.0.1:8080/
echo Course opened at http://127.0.0.1:8080/
echo Close the minimised server window when you finish.
popd
endlocal
