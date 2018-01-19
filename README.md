Docker does not, by default, allow you to send an external request to it
and map it to an internal ports

To enable this functionality:, for example
``
docker container run -p 8080:8002 --name example_container_name example_image_name
``
The number before the colon is the port that the container is running on.

The number after the colon is the port that the Hapi server is running on inside
of the container.

-p is the publish flag which is used for when you need to communicate with the server
that is running inside of the container.  Publish is not an environmental variable
that can be set inside of docker-compose.yml

Example communication with the server inside of the docker container
``
curl -i localhost:8080
``
This will route the request to port 8080 to port 8002 and deliver a response (if
there has been one set up).

NOTE: If there is an empty response from the curl request, it could mean that the port
you published and the port that the server is running on inside of the container is
different.
