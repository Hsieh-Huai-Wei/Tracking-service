## Description

- Language: Typescript
- Framework: NestJS
- Database: PostgreSQL

## Requirement
1. Create logistics fake data. (include detail)
```
POST http://107.21.67.168/api/v1/fake?num=xxx
``` 
2. Get logistics data by sno.
```
GET http://107.21.67.168/api/v1/query?sno=xxx
``` 
3. Get logistics report. (real time)
```
GET http://107.21.67.168/api/v1/query/report
```
4. Cron job. (log logistics report at 0:00, 08:00, 16:00)

5. Database normalization.
```
![image](https://github.com/Hsieh-Huai-Wei/tracking-service/blob/main/database_design.png)
```
6. Cache. (Not yet)

7. Upload logistics report to S3 (not yet)

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

