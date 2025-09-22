import DemoFormPage from "@/components/custom/newForm/Example";
import InputDemo from "@/components/custom/TtInput/InputDemo";
import Logout from "./(auth)/logout/Logout";
import MultiStepFormExample from "@/components/custom/TtInput/InputDemo";

export default function Home() {
  return (
    <div>
      <div>
        <MultiStepFormExample />
        <Logout />
        <DemoFormPage />
      </div>
    </div>
  );
}
