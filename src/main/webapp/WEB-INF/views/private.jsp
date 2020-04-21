<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Evrem</title>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <link href="resources/dist/css/global-styles.css" rel="stylesheet" type="text/css">
    <link rel="shortcut icon" type="image/png" href="resources/favicon.ico"/>
    <style id="css"></style>
</head>
<body>
<script type="text/javascript" src="resources/dist/js/global-libs.js"></script>
<!--[if lt IE 8]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->

<div id="data-container" class="hide">
    {
    "contextPath": "${pageContext.request.contextPath}",
    "csrf": {
        "name":"${_csrf.parameterName}",
        "token":"${_csrf.token}",
        "header":"${_csrf.headerName}"
    },
    "colors": ${colors},
    "periods": ${periods},
    "icons": ${icons},
    "notes": ${notes}
    }
</div>

<div id="app"></div>

<script type="text/javascript" src="resources/dist/js/privatebundle.js"></script>

</body>
</html>
