let Docker = require('dockerode');
let fs = require('node:fs');
let docker = new Docker();

type DockerCommand = (main:string,solution:string) => string[]
let createTester = (image:string,command:DockerCommand) => {
    return (main:string,solution:string) => {
        return new Promise<string>((resolve, reject) => {
            let result: string='';
            docker.createContainer({
                Image: image,
                Mkdir: '/home/test',
                WorkDir: '/home/test',
                AttachStdout: true,
                AttachStdin: true,
                Tty: true,
            }, (err: any, container: any) => {
                container.start((err:any,start:any) => {
                    container.exec({
                        Cmd: command(main,solution),
                        AttachStdout: true,
                        AttachStderr: true
                    }, (err:any,exec:any) => {
                        exec.start((execStartErr:any, stream:any) => {
                            if (execStartErr) {
                                reject(execStartErr);
                                return;
                            }
                            stream.on('data', (chunk:any) => {
                                result += chunk.toString();
                            });

                            stream.on('end', () => {
                                resolve(result);
                                container.stop((err:any,stop:any) => {
                                    container.remove();
                                })
                            });
                        });
                    })
                })
            })
        })
    }
}
export default createTester

// use example
// let Docker = require('dockerode');
// let docker = new Docker();
// import createTester from "./tester/dispatcher";
//
// let tester= createTester("python:latest",(main, solution) => {
//     return ['sh','-c',`echo "${main}" > main.py && echo "${solution}" > solution.py && python main.py`]
// })
// tester("print('xdddd')","").then((v:string) => {
//     console.log("This is result: "+v)
// })