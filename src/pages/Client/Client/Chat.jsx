import React from "react";
import "./chat.css";
import { useLocation } from "react-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useSubscription } from "@apollo/client";
import { NEW_MESSAGE_LISTENER, SEND_MESSAGE } from "../../../graphql/message";
import { toast } from "react-toastify";
import { CREATE_CONTRACT } from "../../../graphql/contract";

export default function Chat() {
  const { state } = useLocation();

  return (
    <div className="container p-0" style={{ height: "100%" }}>
      <div
        className="card"
        style={{ height: "calc(100% - 2rem)", overflow: "hidden" }}
      >
        <div className="row g-0" style={{ height: "100%" }}>
          {/* Chat List */}
          <LeftSide freelancer={state?.freelancer} />

          <RightSide
            receiver={state?.freelancer}
            job={state?.job}
            application={state?.application}
          />
        </div>
      </div>
    </div>
  );
}

function LeftSide({ freelancer, messages }) {
  return (
    <div
      className="col-12 col-lg-5 col-xl-3 border-right"
      style={{ height: "100%" }}
    >
      <div className="px-4 d-none d-md-block">
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">
            <input
              type="text"
              className="form-control my-3"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      <div
        style={{
          height: "calc(100% - 4.4rem)",
          overflow: "auto",
        }}
      >
        {freelancer && (
          <a
            href="#"
            className="list-group-item list-group-item-action border-0"
          >
            <div className="badge bg-success float-right">5</div>
            <div className="d-flex align-items-start">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar5.png"
                className="rounded-circle mr-1 ml-1"
                alt={freelancer?.fullname}
                width="40"
                height="40"
              />
              <div className="flex-grow-1 ml-3">
                {freelancer?.fullname}
                <div className="small">
                  <span className="fas fa-circle chat-online"></span> Online
                </div>
              </div>
            </div>
          </a>
        )}
      </div>
      <hr className="d-block d-lg-none mt-1 mb-0" />
    </div>
  );
}

function RightSide({ receiver, job, application, messages }) {
  const [chats, setChats] = useState([]);
  const [contracted, setContracted] = useState(false);

  const [sendMessageMut, { loading }] = useMutation(SEND_MESSAGE);
  const [createContract, createContractMutation] = useMutation(CREATE_CONTRACT);

  const newMessage = useSubscription(NEW_MESSAGE_LISTENER);

  console.log({ newMessage: newMessage.data });

  const { control, watch } = useForm();

  const sendMessage = async () => {
    try {
      await sendMessageMut({
        variables: {
          input: {
            content: watch("message"),
            receiver_id: receiver?.id,
          },
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const startContract = async () => {
    try {
      await createContract({
        variables: {
          input: {
            start_date: new Date(),
            payment_status: "contracted",
            job_id: job.id,
            employer_id: job.employer_id,
            deadline_date: new Date("10-10-2025"),
            application_id: application?.id,
            amount: application?.price_offer,
          },
        },
      });

      setContracted(true);

      toast.success("Contract Successfully Created!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="col-12 col-lg-7 col-xl-9" style={{ height: "100%" }}>
      {receiver?.id && (
        <>
          <div className="py-2 px-4 border-bottom d-none d-lg-block">
            <div className="d-flex align-items-center py-1" styl>
              <>
                <div className="position-relative">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                    className="rounded-circle mr-1"
                    alt="Sharon Lessman"
                    width="40"
                    height="40"
                  />
                </div>
                <div className="flex-grow-1 pl-3">
                  <strong>{receiver?.fullname}</strong>
                  <div className="text-muted small">
                    <em>online</em>
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-lg mr-1 px-3"
                    onClick={startContract}
                  >
                    Start A Contract
                  </button>
                </div>{" "}
              </>
            </div>
          </div>
          <div
            className="position-relative"
            style={{ height: "calc(100% - 8.5rem)" }}
          >
            <div className="chat-messages p-4">
              <RightSideMessage />
              <LeftSideMessage />
            </div>
          </div>
          <div className="flex-grow-0 py-3 px-4 border-top">
            <div className="input-group">
              <Controller
                name="message"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <input
                      {...field}
                      type="text"
                      className="form-control"
                      placeholder="Type your message"
                    />
                  );
                }}
              />

              <button className="btn btn-primary" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function LeftSideMessage() {
  return (
    <div className="chat-message-left pb-4">
      <div>
        <img
          src="https://bootdey.com/img/Content/avatar/avatar3.png"
          className="rounded-circle mr-1"
          alt="Sharon Lessman"
          width="40"
          height="40"
        />
        <div className="text-muted small text-nowrap mt-2">2:34 am</div>
      </div>
      <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div className="font-weight-bold mb-1">Sharon Lessman</div>
        Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal
        commodo.
      </div>
    </div>
  );
}

function RightSideMessage() {
  return (
    <div className="chat-message-right pb-4">
      <div>
        <img
          src="https://bootdey.com/img/Content/avatar/avatar1.png"
          className="rounded-circle mr-1"
          alt="Chris Wood"
          width="40"
          height="40"
        />
        <div className="text-muted small text-nowrap mt-2">2:33 am</div>
      </div>
      <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
        <div className="font-weight-bold mb-1">You</div>
        Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te
        vix.
      </div>
    </div>
  );
}
