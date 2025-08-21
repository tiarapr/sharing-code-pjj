import PageMeta from "@/components/common/PageMeta";
import AuthLayout from "../components/layout/AuthPageLayout";
import SignUpForm from "../components/forms/SignUpForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Konseling PENS | Sign Up"
        description="Halaman Sign Up"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
