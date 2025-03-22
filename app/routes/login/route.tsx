import { json, LoaderFunctionArgs, ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import { Lock } from "lucide-react";

export const meta = () => {
  return [
    { title: "Login - Campaign Platform" },
    { name: "description", content: "Login to manage your campaigns" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient(request, response);
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    return redirect("/admin");
  }

  const message = new URL(request.url).searchParams.get("message");

  return json(
    { message },
    { headers: response.headers }
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient(request, response);

  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return json(
      { error: error.message },
      { status: 400, headers: response.headers }
    );
  }

  if (data?.user) {
    return redirect("/admin", {
      headers: response.headers,
    });
  }

  return json(
    { error: "Something went wrong" },
    { status: 400, headers: response.headers }
  );
}

export default function Login() {
  const { error, message } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#2d2d2d] p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <Lock className="w-8 h-8 text-[rgb(var(--primary))]" />
          <h1 className="text-2xl font-bold">Login</h1>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded mb-4">
            {message}
          </div>
        )}

        <Form method="post">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 rounded bg-[#1d1d1d] border border-[#3d3d3d] focus:outline-none focus:border-[rgb(var(--primary))]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-2 rounded bg-[#1d1d1d] border border-[#3d3d3d] focus:outline-none focus:border-[rgb(var(--primary))]"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-[rgb(var(--primary))] text-[#1d1d1d] rounded-lg font-medium hover:opacity-90"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[rgb(var(--primary))] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}