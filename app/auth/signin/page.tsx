import {providerMap, signIn} from "@/auth";
import Features from "@/components/Features";
import {
  faApple,
  faDiscord,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type ProviderId = "github" | "google" | "discord" | "apple";

const providerIcons: Record<ProviderId, any> = {
  github: faGithub,
  google: faGoogle,
  discord: faDiscord,
  apple: faApple,
};

export default function SignInPage({searchParams}: any) {
  console.log(searchParams);

  return (
    <div
      style={{
        backgroundImage:
          'url("https://img.freepik.com/premium-photo/battling-ropes-girl-gym-workout-exercise-fitted-body_183219-658.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="flex flex-col items-center justify-center -mt-20"
    >
      <Features />
      <div className="flex flex-col gap-4 justify-center items-center m-40 p-10 sm:w-96 mx-auto bg-black/15 rounded-sm">
        <h1 className="text-2xl font-bold text-gray-200">Sign In</h1>
        <p className="text-gray-300 text-sm">
          Sign in with one of the providers
        </p>
        {Object.values(providerMap).map(provider => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              await signIn(provider.id, {
                redirectTo: searchParams.callbackUrl || "/",
              });
            }}
            className="flex justify-center items-center gap-4"
          >
            <button
              type="submit"
              className="
              flex justify-between items-center
              bg-black w-72 border border-orange-400
              gap-4 font-normal leading-6 text-gray-200
              transition-all md:text-md hover:text-gray-300
              hover:bg-stone-900/80 px-4 py-2
              md:px-4 md:py-3 rounded-sm
            "
            >
              {provider.name}{" "}
              <FontAwesomeIcon
                className="size-6 text-orange-400 hover:text-orange-300 transition-all"
                icon={providerIcons[provider.id as ProviderId]}
              />
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
