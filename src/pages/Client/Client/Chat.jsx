import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  CustomDateTimePicker,
  CustomTextField,
} from "../../../components/CustomTextField";
import { CREATE_CONTRACT } from "../../../graphql/contract";
import {
  GET_MESSAGES,
  NEW_MESSAGE_LISTENER,
  SEND_MESSAGE,
} from "../../../graphql/message";
import "./chat.css";
import { useTranslation } from "react-i18next";
export default function Chat() {
  const { t } = useTranslation();

  const { state } = useLocation();

  const [messages, setMessages] = useState([]);
  const [selectedChats, setSelectedChats] = useState([]);

  const { data, loading, refetch } = useQuery(GET_MESSAGES);

  useEffect(() => {
    setMessages(data?.messages);
  }, [data, loading]);

  return (
    <div className="container p-0" style={{ height: "100%" }}>
      <div
        className="card"
        style={{
          height: "calc(100% - 2rem)",
          overflow: "hidden",
        }}
      >
        <div className="row g-0" style={{ height: "100%" }}>
          {/* Chat List */}

          {loading ? (
            <div style={{ height: "100%", width: "100%" }}>
              <CircularProgress />
            </div>
          ) : (
            <>
              {" "}
              <LeftSide
                messages={messages}
                freelancer={state?.freelancer}
                setSelectedChats={setSelectedChats}
              />
              <RightSide
                receiver={state?.freelancer}
                job={state?.job}
                application={state?.application}
                messages={selectedChats}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function LeftSide({ freelancer, messages, setSelectedChats }) {
  const { t } = useTranslation();

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
              placeholder={t("Search...")}
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
        {messages?.map((msg, i) => (
          <button
            key={i}
            onClick={setSelectedChats(msg)}
            className="list-group-item list-group-item-action border-0 px-3"
            style={{ cursor: "pointer" }}
          >
            <div className="badge bg-success float-right">0</div>
            <div className="d-flex align-items-start">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar5.png"
                className="rounded-circle mr-1 ml-1"
                alt={freelancer?.fullname}
                width="40"
                height="40"
              />
              <div className="flex-grow-1 ml-3">
                {msg.user_id}
                <div className="small">
                  <span className="fas fa-circle chat-online"></span> Online
                </div>
              </div>
            </div>
          </button>
        ))}
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
  const { t } = useTranslation();

  const { currentUser } = useSelector((state) => state.auth);

  const [chats, setChats] = useState([]);
  const [contracted, setContracted] = useState(false);

  const [sendMessageMut, { loading }] = useMutation(SEND_MESSAGE);
  const [createContract, createContractMutation] = useMutation(CREATE_CONTRACT);

  const newMessage = useSubscription(NEW_MESSAGE_LISTENER);

  console.log({ newMessage: newMessage.data });

  const { control, watch, trigger } = useForm({
    mode: "all",
    resolver: contract_validator,
  });

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
    const isValid = await trigger([
      "offered_amount",
      "start_date",
      "deadline_date",
    ]);

    if (isValid) {
      try {
        await createContract({
          variables: {
            input: {
              job_id: job.id,
              freelancer_id: receiver?.id,
              offered_amount: parseFloat(watch("offered_amount")),
              start_date: watch("start_date"),
              deadline_date: watch("deadline_date"),
            },
          },
        });

        setContracted(true);

        toast.success(t("Contract Successfully Created!"));
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="col-12 col-lg-7 col-xl-9" style={{ height: "100%" }}>
      {messages && (
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
                  <strong>{messages?.user_id}</strong>
                  <div className="text-muted small">
                    <em>{t("online")}</em>
                  </div>
                </div>
                <div>
                  {/* <button
                    className="btn btn-primary btn-lg mr-1 px-3"
                    onClick={startContract}
                  >
                    Start A Contract
                  </button> */}

                  {/* <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown button
                  </button> */}

                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    {t("Start a Contract")}
                  </button>

                  <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel"
                          >
                            {t("Create a Contract")}
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form
                            className="row g-3 needs-validation"
                            // onSubmit={handleSubmit(onSubmit)}
                          >
                            <CustomTextField
                              control={control}
                              name={"offered_amount"}
                              label={"Offered Amount"}
                              type={"number"}
                            />

                            <CustomDateTimePicker
                              control={control}
                              name={"start_date"}
                              label={"Start Date"}
                            />
                            <CustomDateTimePicker
                              control={control}
                              name={"deadline_date"}
                              label={"Deadline Date"}
                            />
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            {t("Close")}
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={startContract}
                          >
                            {t("Request Contract")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </>
            </div>
          </div>
          <div
            className="position-relative"
            style={{ height: "calc(100% - 8.5rem)" }}
          >
            <div className="chat-messages p-4">
              {messages?.messages?.map((msg, i) =>
                msg?.sender_id === currentUser?.id ? (
                  <RightSideMessage key={i} msg={msg} />
                ) : (
                  <LeftSideMessage key={i} msg={msg} />
                )
              )}
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
                {t("Send")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function LeftSideMessage({ msg }) {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="chat-message-left pb-4">
      <div>
        {/* <img
          src="https://bootdey.com/img/Content/avatar/avatar3.png"
          className="rounded-circle mr-1"
          alt="Sharon Lessman"
          width="40"
          height="40"
        /> */}
        <Avatar>
          {currentUser.id === msg?.sender?.id
            ? msg?.sender?.fullname[0]
            : msg?.receiver?.fullname[0]}
        </Avatar>
        <div className="text-muted small text-nowrap mt-2">
          {new Date(msg?.createdAt).toLocaleTimeString()}
        </div>
      </div>
      <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div className="font-weight-bold mb-1">
          {currentUser.id === msg?.sender?.id
            ? msg?.sender?.fullname
            : msg?.receiver?.fullname}
        </div>
        {msg?.content}
      </div>
    </div>
  );
}

function RightSideMessage({ msg }) {
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

const contract_validator = yupResolver(
  Yup.object().shape({
    offered_amount: Yup.number().required(),
    start_date: Yup.date().required(),
    deadline_date: Yup.date().required(),
  })
);
