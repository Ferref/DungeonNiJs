<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DungeonNi</title>
    @vite(['resources/css/style.css', 'resources/js/app.js'])
    @stack('scripts')
</head>
<body>
    @include('layouts.navbar')
    @yield('content')
</body>
</html>