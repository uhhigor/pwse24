#!/run/current-system/sw/bin/bash
docker run -d --privileged -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 --name $1 $2
