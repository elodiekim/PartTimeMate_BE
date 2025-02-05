

# 의존성 설치하기
$ yarn

# git clone 후 yarn dev 실행이 안될 경우
node_modules 폴더가 있는지 확인하고 없으면 package.json이 있는 위치에서
yarn install하여 패키지 재생성

# 로컬 서버 실행하기
$ yarn start:local

# 개발 서버 실행하기
$ yarn start:dev

# .env.local 파일 생성하기
로컬 환경에서 실행하기 위해서 `.env.local` 파일을 프로젝트 루트에 생성한 후, 아래와 같이 환경 변수를 설정해주세요:

```dotenv
NODE_ENV=local
SERVER_PORT=4000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_PASSWORD=YOUR_DB_PASSWORD_HERE
DB_DATABASE=YOUR_DB_NAME_HERE
DB_DATABASE=part_time_mate
DB_TIMEZONE=+11:00