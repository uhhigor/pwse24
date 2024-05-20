import * as string_decoder from "string_decoder";

let Docker = require('dockerode');
let fs = require('node:fs');
let docker = new Docker();

type DockerCommand = (main:string,solution:string) => string[]

let ensureImage = (image:string) => {
    return new Promise((resolve:any, reject:any) => {
        docker.listImages().then((v: any) => {
            let i = v.filter((im: any) => {
                return im.RepoTags.includes(image)
            })
            if(i.length == 0){
                docker.pull(image,(err:any,stream:any) => {
                    if(err){
                        reject(err)
                    }
                    else resolve(true)
                })
            }
        }).catch((err:any) => reject(err))
    })

}
type Result = {body:string,passed:boolean}
let createTester =  (image: string, command: DockerCommand) => {

    return (main: string, solution: string) => {
        return new Promise<Result>((resolve, reject) => {
            let result: string = '';
            docker.createContainer({
                Image: image,
                Mkdir: '/home/test',
                WorkDir: '/home/test',
                AttachStdout: true,
                AttachStdin: true,
                Tty: true,
            }, (err: any, container: any) => {
                container.start((err: any, start: any) => {
                    container.exec({
                        Cmd: command(main, solution),
                        AttachStdout: true,
                        AttachStderr: true
                    }, (err: any, exec: any) => {
                        exec.start((execStartErr: any, stream: any) => {
                            if (execStartErr) {
                                reject(execStartErr);
                                return;
                            }
                            stream.on('data', (chunk: any) => {
                                result += chunk.toString();
                            });

                            stream.on('end', () => {
                                // resolve(result);
                                exec.inspect((inspectErr: any, data: any) => {
                                    if (inspectErr) {
                                        reject(inspectErr);
                                        return;
                                    }

                                    const exitCode = data.ExitCode;

                                    if (exitCode === 0) {
                                        resolve({body: result, passed: true});
                                    } else {
                                        resolve({body: result, passed: false});
                                    }
                                })


                                container.stop((err: any, stop: any) => {
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

export let python= createTester("python:latest",(main, solution) => {
    return ['sh','-c',`echo "${main}" > main.py && echo "${solution}" > solution.py && python -m unittest -v main.py`]
})
export enum Images{
    pythonImage = "python"
}
export let getContainer = (name:string) => {
    switch (name){
        case Images.pythonImage: return python
        default: return "Language "+name+" is not implemented";
    }
};


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