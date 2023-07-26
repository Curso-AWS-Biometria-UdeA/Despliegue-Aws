./mvnw clean package
mv target/backend_api_gender_age-0.0.1-SNAPSHOT.jar contenedor_test/backend_api_gender_age-0.0.1-SNAPSHOT.jar
cd contenedor_test/
docker image build -t local_image_minicurso .
docker tag local_image_minicurso:latest 346379607974.dkr.ecr.us-east-1.amazonaws.com/minicurso_image:latest
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 346379607974.dkr.ecr.us-east-1.amazonaws.com
docker push 346379607974.dkr.ecr.us-east-1.amazonaws.com/minicurso_image
