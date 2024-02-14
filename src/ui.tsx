import React, { FormEvent, useEffect, ChangeEvent, useState } from "react";
import ReactDOM from "react-dom";
import "./ui.scss";

const uint8ArrayToBase64 = (bytes: Uint8Array) => {
  let binary = "";
  let len = bytes.byteLength;

  for (let i = 0; i < len; i += 1024) {
    const chunk = bytes.subarray(i, i + 1024);
    binary += String.fromCharCode.apply(null, chunk);
  }

  return window.btoa(binary);
};

export const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    parent.postMessage(
      {
        pluginMessage: apiKey,
      },
      "*"
    );
  };

  useEffect(() => {
    window.onmessage = async (event) => {
      if (event.data.pluginMessage.type == "key") {
        setApiKey(event.data.pluginMessage.apikey || "");
      }
      if (event.data.pluginMessage.type == "run") {
        try {
          const base64 = uint8ArrayToBase64(
            new Uint8Array(event.data.pluginMessage.bytes)
          );

          const body = {
                  "imageBase64": base64
          };
          const formData = new FormData();
          formData.append("size", "auto");
          formData.append("image_file_b64", base64);
          console.log(event.data.pluginMessage.apikey,)
          let credits: string = "";
          console.log("here ")
          fetch("https://api.pixcleaner.com/v2/autoremove", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': event.data.pluginMessage.apikey,
            },
            body: JSON.stringify(body),
            
          })
          .then(response => response.json())
            .then(async (data) => {
              const url = data.resultImage.url
              console.log("here 444 1" + url)
              const response = await fetch(url);
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const blob = await response.blob();
              console.log('Blob representation of the image:', blob);
          
              const arrayBuffer = await blob.arrayBuffer();
              console.log('ArrayBuffer representation of the image:', arrayBuffer);
          
              const uint8Array = new Uint8Array(arrayBuffer);
              console.log('Uint8Array representation of the image:', uint8Array);
              parent.postMessage(
                {
                  pluginMessage: {
                    uint8Array,
                    credits,
                  },
                },
                "*"
              );
            })
            .catch((response) => {
              try {
                response.json().then((res) => {
                  parent.postMessage(
                    {
                      pluginMessage: res,
                    },
                    "*"
                  );
                });
              } catch (e) {
                parent.postMessage(
                  {
                    pluginMessage: {
                      type: "error",
                      message: "Error, please DM me on 𝕏 @PixCleaner",
                    },
                  },
                  "*"
                );
              }
            });
        } catch (e) {
          parent.postMessage(
            {
              pluginMessage: {
                type: "error",
                message: " DM me on 𝕏 @PixCleaner",
              },
            },
            "*"
          );
        }
      }
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} id="setApiKey">
      <ol>
        <li>
          Go to the{" "}
          <a
            target="_blank"
            href="https://pixcleaner.com/home"
          >
            PixCleaner
          </a>{" "}
          and create a free account (you will need to confirm your email).
        </li>
        <li>
          After that you can find your API key here{" "}
          <a target="_blank" href="https://pixcleaner.com/background-remover-tools/api">
          https://pixcleaner.com/background-remover-tools/api
          </a>
          .
        </li>
      </ol>
      <div className="row">
        <input
          type="text"
          placeholder="Api Key"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setApiKey(event.target.value)
          }
          value={apiKey}
        />
        <button type="submit">Save</button>
      </div>
      <p>
        More information about free accounts &amp; pricing{" "}
        <a target="_blank" href="https://pixcleaner.com/pricing">
          here
        </a>
        .
      </p>
      <p>
        Follow us on{" "}
        <a target="_blank" href="https://twitter.com/Pixcleaner">
          𝕏 (@Pixcleaner)
        </a>{" "}
        for updates &amp; more.
      </p>
    </form>
  );
};

ReactDOM.render(<App />, document.getElementById("react-page"));
