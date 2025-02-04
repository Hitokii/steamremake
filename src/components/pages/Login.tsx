import React, { useEffect } from "react";
import { getUserByUsername, User } from "../../data/user";
import { db, signInWithGithub } from "../../services/Firebase";
import { FaGithub } from "react-icons/fa6";

export default function LoginPage() {

  useEffect(() => {
    if (window.localStorage.getItem("user") !== null) {
      window.location.href = "/";
    }
  }, []);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [passwordIncorrect, setPasswordIncorrect] = React.useState(false);

  const checkLogin = () => {
    console.log(username);
    getUserByUsername(db, username).then((user: User | null) => {
      if (user === null) {
        console.log('User not found');
        return;
      }

      if (user?.password === password) {
      window.localStorage.setItem('user', JSON.stringify(user));
      window.location.href = "/";
      } else {
        document.getElementById('password')?.classList.add('border-2', 'border-red-500');
        setPasswordIncorrect(true);
      }
    });
  };



  return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl shadow  bg-background-highlight w-1/4 h-1/2 text-text-main flex flex-col p-5">
        <h1 className="text-3xl motiva font-bold text-center pb-6">Connexion</h1>

        <div className="flex flex-col m-3">
          <span className="text-xl font-semibold">Identifiant</span>
          <input type="text" className="p-5 rounded text-black" placeholder="Pseudonyme" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="flex flex-col m-3">
          <span className="text-xl font-semibold">Mot de passe</span>
          <input id="password"  type="password" className="p-5 rounded text-black" placeholder="********" onKeyDown={(e) => e.key == "Enter" ? checkLogin() : null}  onChange={(e) => setPassword(e.target.value)} />
          <span className={(passwordIncorrect ? "block" : "hidden") + " text-red-500"}>Mot de passe incorrect!</span>
        </div>

      <div className="flex w-full gap-4">
      <button className="bg-slate-800 rounded text-text-main mt-6 p-5 font-bold text-xl flex items-center gap-2 w-full justify-center" onClick={() => signInWithGithub()}><FaGithub/>  Github</button>
      <button className="bg-blue-500 rounded text-text-main mt-6 p-5 font-bold text-xl text-center w-full" onClick={checkLogin}>Se connecter</button>
      </div>
        
        <a href="/register" className="text-center underline text-text-dim p-1">Pas de compte ? Cliquez ici!</a>
      </div>
  );
}
