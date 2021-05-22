import React, { useState, useEffect } from "react";
import axios from "../config/axios";
import Fade from "@material-ui/core/Fade";
import ProfileModal from "../component/ProfileModal";
import Head from "../component/Head";
import { useMyContext } from "../context/MyContext";
import { useHistory } from "react-router-dom";
function ProfilePage() {
  const [open, setOpen] = useState({
    status: false,
    mode: "",
    id: "",
  });
  const { profile, setProfile } = useMyContext();
  const [edit, setEdit] = useState(false);
  const history = useHistory();

  async function getProfile() {
    const respond = await axios.get(`/profile`);
    const {
      data: { data },
    } = respond;
    console.log(respond);
    setProfile(data);
  }

  useEffect(async () => {
    getProfile();
  }, []);

  const handleOpen = (event) => {
    const { title, id } = event.target;

    console.log(title, id);
    setOpen({ status: true, mode: title, id });
    console.log(profile);
  };
  return (
    <div>
      <div className="App">
        <Head />
        <div>
          {edit ? (
            <Fade in={edit}>
              <div>
                <h3 className="text-white text-7xl 2xl:pt-28 xl:pt-7 text-center">
                  Manage Profile :
                </h3>
              </div>
            </Fade>
          ) : (
            <div>
              <h3 className="text-white text-7xl 2xl:pt-28 xl:pt-7 text-center">
                {" "}
                Who's watching?
              </h3>
            </div>
          )}
        </div>
        <div className="flex justify-center space-x-10 pt-10">
          {profile?.map((item) => {
            return (
              <div>
                {edit ? (
                  <Fade in={edit}>
                    <div>
                      {edit && (
                        <>
                          <div
                            onClick={(e) => handleOpen(e)}
                            id={item.id}
                            title="Edit Profile"
                            style={{
                              width: "200px",
                              height: "200px",
                              position: "absolute",
                              zIndex: "1",
                              color: "white",
                            }}
                            className={`bg-gray-900 opacity-60 flex justify-center items-center`}
                          >
                            <div>
                              <button
                                onClick={(e) => handleOpen(e)}
                                title="Edit Profile"
                                id={item.id}
                                className="border-white border-2 p-1 hover:text-black-500 hover:border-2 hover:border-black focus:outline-none"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                      <img
                        style={{
                          width: "200px",
                          height: "200px",
                          position: "relative",
                          objectFit: "cover",
                          objectPosition: "50% 50%",
                        }}
                        src={
                          item.profilePicture ||
                          "https://res.cloudinary.com/dyfaqbpys/image/upload/v1621586565/h4fyyyo736zdnje86gnr.jpg"
                        }
                      />
                    </div>
                  </Fade>
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => history.push("/")}
                  >
                    <img
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        objectPosition: "50% 50%",
                      }}
                      src={
                        item.profilePicture ||
                        "https://res.cloudinary.com/dyfaqbpys/image/upload/v1621586565/h4fyyyo736zdnje86gnr.jpg"
                      }
                    />
                  </div>
                )}
                {edit ? (
                  <Fade in={edit}>
                    <h2 class="text-center mt-1 text-gray-400">
                      {item.profileName}
                    </h2>
                  </Fade>
                ) : (
                  <div>
                    <h2 class="text-center mt-1 text-gray-400">
                      {item.profileName}
                    </h2>
                  </div>
                )}
              </div>
            );
          })}
          <div>
            <ProfileModal
              profile={profile}
              getProfile={getProfile}
              open={open}
              setOpen={setOpen}
            />
          </div>
          {profile?.length < 4 && (
            <div>
              <div
                title="Add Profile"
                style={{ width: "200px", height: "200px" }}
                className="flex justify-center items-center"
              >
                <div>
                  <button
                    title="Add Profile"
                    onClick={(e) => handleOpen(e)}
                    style={{ width: "200px", height: "200px" }}
                    className="hover:bg-white text-gray-400 text-7xl"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <h2 class="text-center mt-1 text-gray-400">Add Profile</h2>
              </div>
            </div>
          )}
        </div>
        {edit ? (
          <Fade in={edit}>
            <div className="text-center pt-10">
              <button
                onClick={() => setEdit(false)}
                class="bg-white text-black text-2xl p-4  hover:bg-red-500 hover:text-white"
              >
                Done
              </button>
            </div>
          </Fade>
        ) : (
          <div className="text-center pt-10">
            <button
              onClick={() => setEdit(true)}
              class="text-gray-400 border-gray-400 text-2xl p-4 border-solid border-2 hover:border-solid hover:border-2 hover:border-white hover:text-white"
            >
              MANAGE PROFILES
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
