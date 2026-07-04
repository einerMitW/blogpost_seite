> [4/7] RUN npm ci --only=production:                                                                                                 
0.266 npm warn config only Use `--omit=dev` to omit dev dependencies from the install.
1.218 npm warn deprecated prebuild-install@7.1.3: No longer maintained. Please contact the author of the relevant native addon; alternatives are available.
3.920 npm error code 1
3.920 npm error path /app/node_modules/better-sqlite3
3.920 npm error command failed
3.920 npm error command sh -c prebuild-install || node-gyp rebuild --release
3.920 npm error prebuild-install warn install No prebuilt binaries found (target=20.20.2 runtime=node arch=x64 libc=musl platform=linux)
3.920 npm error gyp info it worked if it ends with ok
3.920 npm error gyp info using node-gyp@10.1.0
3.920 npm error gyp info using node@20.20.2 | linux | x64
3.920 npm error gyp ERR! find Python 
3.920 npm error gyp ERR! find Python Python is not set from command line or npm configuration
3.920 npm error gyp ERR! find Python Python is not set from environment variable PYTHON
3.920 npm error gyp ERR! find Python checking if "python3" can be used
3.920 npm error gyp ERR! find Python - executable path is ""
3.920 npm error gyp ERR! find Python - "" could not be run
3.920 npm error gyp ERR! find Python checking if "python" can be used
3.920 npm error gyp ERR! find Python - executable path is ""
3.920 npm error gyp ERR! find Python - "" could not be run
3.920 npm error gyp ERR! find Python 
3.920 npm error gyp ERR! find Python **********************************************************
3.920 npm error gyp ERR! find Python You need to install the latest version of Python.
3.920 npm error gyp ERR! find Python Node-gyp should be able to find and use Python. If not,
3.920 npm error gyp ERR! find Python you can try one of the following options:
3.920 npm error gyp ERR! find Python - Use the switch --python="/path/to/pythonexecutable"
3.920 npm error gyp ERR! find Python (accepted by both node-gyp and npm)
3.920 npm error gyp ERR! find Python - Set the environment variable PYTHON
3.920 npm error gyp ERR! find Python - Set the npm configuration variable python:
3.920 npm error gyp ERR! find Python npm config set python "/path/to/pythonexecutable"
3.920 npm error gyp ERR! find Python For more information consult the documentation at:
3.920 npm error gyp ERR! find Python https://github.com/nodejs/node-gyp#installation
3.920 npm error gyp ERR! find Python **********************************************************
3.920 npm error gyp ERR! find Python 
3.920 npm error gyp ERR! configure error 
3.920 npm error gyp ERR! stack Error: Could not find any Python installation to use
3.920 npm error gyp ERR! stack at PythonFinder.fail (/usr/local/lib/node_modules/npm/node_modules/node-gyp/lib/find-python.js:306:11)
3.920 npm error gyp ERR! stack at PythonFinder.findPython (/usr/local/lib/node_modules/npm/node_modules/node-gyp/lib/find-python.js:164:17)
3.920 npm error gyp ERR! stack at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
3.920 npm error gyp ERR! stack at async configure (/usr/local/lib/node_modules/npm/node_modules/node-gyp/lib/configure.js:27:18)
3.920 npm error gyp ERR! stack at async run (/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js:81:18)
3.920 npm error gyp ERR! System Linux 6.6.87.2-microsoft-standard-WSL2
3.920 npm error gyp ERR! command "/usr/local/bin/node" "/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild" "--release"
3.920 npm error gyp ERR! cwd /app/node_modules/better-sqlite3
3.920 npm error gyp ERR! node -v v20.20.2
3.920 npm error gyp ERR! node-gyp -v v10.1.0
3.920 npm error gyp ERR! not ok
3.921 npm notice
3.921 npm notice New major version of npm available! 10.8.2 -> 11.18.0
3.921 npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.18.0
3.921 npm notice To update run: npm install -g npm@11.18.0
3.921 npm notice
3.921 npm error A complete log of this run can be found in: /root/.npm/_logs/2026-07-04T11_36_21_347Z-debug-0.log
------
Dockerfile:9

--------------------

   7 |     # Copy package files and install production dependencies

   8 |     COPY package*.json ./

   9 | >>> RUN npm ci --only=production

  10 |     

  11 |     # Copy application source code

--------------------

failed to solve: process "/bin/sh -c npm ci --only=production" did not complete successfully: exit code: 1



View build details: docker-desktop://dashboard/build/desktop-linux/desktop-linux/69typf3e5cb0h7jozuthzrywc