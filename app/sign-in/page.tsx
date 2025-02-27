import Link from "next/link";

const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Sign In</h1>
      <p className="text-gray-600">
        Don’t have an account?
        <Link className="m-1 hover:text-blue-300" href="/sign-up">Sign up</Link>
      </p>
    </div>
  );
};

export default SignIn;
