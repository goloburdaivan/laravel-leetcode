<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Course Invitation</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header text-center">
                    <h2>Confirm Invitation to Join "{{ $course->name }}"</h2>
                </div>
                <div class="card-body">
                    <p>Hello, {{ $user->name }}!</p>
                    <p>You have been invited to join the course <strong>{{ $course->name }}</strong>.</p>
                    <p>Please confirm your participation by clicking the button below.</p>

                    <div class="d-grid">
                        <a href="{{ url('/accept-invite?token=' . $token) }}" class="btn btn-success">Confirm Invitation</a>
                    </div>
                </div>
            </div>
            <div class="text-center mt-3">
                <a href="{{ route('user.index') }}" class="btn btn-link">Cancel</a>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
