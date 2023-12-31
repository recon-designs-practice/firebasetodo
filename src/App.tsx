import React from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestoreDb } from "./firebase";
import useUserStore from "./stores/userStore";
import { Layout } from "./components";
import { LogInPage, SignUpPage, DashboardPage } from "./pages";

function App() {
  // @ts-expect-error
  const currentUser = useUserStore((state) => state.currentUser);
  // @ts-expect-error
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid } = user;

        const docRef = doc(firestoreDb, "users", uid);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const newObj = { ...docSnapshot.data() };

          setCurrentUser(newObj);
        }
      } else {
        setCurrentUser(null);
      }
    });
  }, [currentUser, setCurrentUser]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/dashboard/:userId" element={<DashboardPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
