export function LogoutButton() {
    return (
        <form action="/api/auth/logout" method="post">
            <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
                Logout
            </button>
        </form>
    );
}   