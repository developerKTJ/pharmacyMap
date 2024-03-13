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

## 약국 검색 기능 및 지도 표시 기능
> 사용자가 원하는 시도 및 시군구를 선택하여 약국을 검색할 수 있습니다. 검색 결과에 따른 약국 위치를 네이버 지도 상에 마커로 표시합니다.

<details>
<summary>구현 방법</summary>

#### 검색을 위한 HTML 폼 (`test2.html`):
- 사용자는 드롭다운 메뉴를 통해 시도와 시군구를 선택합니다.
- 버튼을 클릭하여 검색 작업을 트리거합니다.

#### 공공 데이터 API로의 AJAX 요청 (`index.js`):
- `axios.get`을 사용하여 선택한 시도와 시군구에 기반하여 약국 데이터를 가져옵니다.
- 요청 URL에는 서비스 키, 지역 및 쿼리 옵션이 포함됩니다.
- 응답을 구문 분석하여 약국 정보를 추출하고 지도에 표시합니다.

#### 네이버 지도에 마커 표시 (`test2.html`):
- 약국 데이터를 가져온 후 Naver 지도를 초기화하고 API 응답에서 위도와 경도를 사용하여 각 약국 위치에 마커를 설정합니다.
- 지도 및 마커 기능에 대해 Naver Maps JavaScript API를 활용합니다.
</details>

## 약국 상세 정보 조회
> 마커를 클릭하면 약국의 상세 정보(이름, 주소, 운영 시간 등)를 볼 수 있는 정보 창을 제공합니다.

<details>
<summary>구현 방법</summary>

#### 마커 클릭 시 상세 정보 창 (`test2.html`):
- 맵 상의 각 마커에 대한 `InfoWindow`를 구현합니다.
- 마커를 클릭하면 약국 이름, 주소, 연락처 및 영업 시간과 같은 상세 정보를 표시합니다.
</details>

## 이메일 전송 기능
> 검색된 약국 정보를 사용자 이메일로 전송할 수 있습니다.

<details>
<summary>구현 방법</summary>

#### 이메일을 위한 Node.js 서버 설정 (`index.js`):
- `nodemailer`를 사용하여 이메일을 보내기 위한 SMTP 서버를 구성합니다.
- 프론트 엔드에서 사용자 이름, 이메일 주소 및 선택한 약국 정보를 포함하는 폼 데이터를 받습니다.

#### 이메일 작성 및 전송 (`index.js`):
- 사용자가 지정한 이메일 주소로 약국 정보를 포함한 HTML 이메일을 작성합니다.
- 이메일을 사용자의 지정된 이메일 주소로 보냅니다.
</details>

## 검색 기록 관리
> 사용자의 검색 기록을 저장하고, 검색 목록 페이지에서 전체 삭제 기능을 제공합니다.

<details>
<summary>구현 방법</summary>

#### 검색 쿼리 저장 (`index.js`):
- 검색 요청이 있을 때마다 검색 매개변수(시도 및 시군구)를 MySQL 데이터베이스에 저장합니다.
- 검색 기록을 만들고 검색 기록을 검색하고 관리하기 위한 엔드포인트를 제공합니다.

#### 검색 기록 표시 및 관리 (`searchList.html` 및 `index.js`):
- 이전 검색의 목록을 렌더링하고 개별 레코드를 보거나 삭제하거나 전체 검색 기록을 지울 수 있는 옵션을 제공합니다.
- EJS를 사용하여 데이터베이스에서 검색 기록 데이터를 기반으로 HTML 내용을 동적으로 생성합니다.
</details>
