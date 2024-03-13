# 프로젝트 소개

>이 프로젝트는 공공데이터 API와 네이버 지도 API를 활용하여 사용자가 전국의 약국 정보를 쉽게 검색하고 지도상에서 확인할 수 있는 서비스를 제공합니다.\
>사용자는 특정 지역의 약국 위치, 운영 시간, 연락처 정보 등을 확인할 수 있으며, 검색한 약국 정보를 이메일로 받을 수 있는 기능을 포함합니다.

### 개발 기간 및 인원
>7일\
>개인프로젝트

### 웹사이트 바로가기
>URL https://210.117.212.37:3001/
<br/>

## 기술 스택

![html](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&amp;logo=html5&amp;logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&amp;logo=css3&amp;logoColor=white)
![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&amp;logo=javascript&amp;logoColor=black)
![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=flat-square&amp;logo=jQuery&amp;logoColor=white)
<br/>
<br/>

# 주요 기능

## 약국 검색 기능
>사용자가 원하는 시도 및 시군구를 선택하여 약국을 검색할 수 있습니다.
### 구현 방법
- 사용자는 HTML form을 통해 시도 및 시군구를 선택하고 검색 버튼을 클릭합니다.
- JavaScript의 `fetch` 또는 `axios`를 사용하여 공공데이터 API에 검색 조건을 포함한 요청을 보냅니다.

## 지도 표시 기능
>검색 결과에 따른 약국 위치를 네이버 지도 상에 마커로 표시합니다.
### 구현 방법
- 공공데이터 API로부터 받은 약국 정보를 바탕으로 네이버 지도 API를 사용해 지도 상에 약국 위치를 마커로 표시합니다.

## 약국 상세 정보 조회
>마커를 클릭하면 약국의 상세 정보(이름, 주소, 운영 시간 등)를 볼 수 있는 정보 창을 제공합니다.
### 구현 방법
- 네이버 지도 API의 `InfoWindow` 객체를 사용하여 마커 클릭 시 약국의 상세 정보를 보여주는 정보 창을 구현합니다.

## 이메일 전송 기능
>검색된 약국 정보를 사용자 이메일로 전송할 수 있습니다.
### 구현 방법
- `nodemailer` 라이브러리를 사용하여 Node.js 서버에서 사용자가 입력한 이메일 주소로 약국 정보를 포함한 이메일을 전송합니다.

## 검색 기록 관리
>사용자의 검색 기록을 저장하고, 검색 목록 페이지에서 전체 삭제 기능을 제공합니다.
### 구현 방법
- 검색 조건과 결과를 MySQL 데이터베이스에 저장합니다.
- Express.js 서버에서 `/searchList`, `/delete`, `/deleteAll` 등의 라우트를 구현하여 검색 목록의 조회, 개별 삭제, 전체 삭제 기능을 제공합니다.
