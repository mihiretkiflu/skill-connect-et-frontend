import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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

export default function Chat() {
  const { t } = useTranslation();

  const { state } = useLocation();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);
  const [selectedChat, setSelectedChat] = useState({});

  const { data, loading, refetch } = useQuery(GET_MESSAGES);
  const newMessage = useSubscription(NEW_MESSAGE_LISTENER);

  useEffect(() => {
    setMessages(data?.messages);
    setSelectedChat(
      data?.messages?.find(
        (m) => m?.participant?.id === selectedChat?.participant?.id
      )
    );
  }, [data, loading]);

  useEffect(() => {
    refetch();
    if (data?.contractRequested) {
      toast.info(t("You have new message !"));
    }
  }, [newMessage.data, newMessage.loading]);

  useEffect(() => {
    if (state?.freelancer) {
      const messageSign = {
        participant: {
          ...state?.freelancer,
          fullname:
            state?.freelancer?.firstname + " " + state?.freelancer?.lastname,
        },
        messages: [],
      };

      const msg = messages.find(
        (m) => m?.participant?.id === state?.freelancer?.id
      );

      if (msg) {
        setSelectedChat(msg);
      } else {
        setMessage(messageSign);
        setSelectedChat(messageSign);
      }
    }
  }, [state]);

  return (
    <div className="container p-0" style={{ height: "100%" }}>
      <div
        className="card"
        style={{
          height: "calc(100% - 2rem)",
          overflow: "hidden",
        }}
      >
        <div
          className="row g-0"
          style={{
            height: "100%",
          }}
        >
          {loading ? (
            <div style={{ height: "100%", width: "100%" }}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <LeftSide
                message={message}
                messages={messages}
                setSelectedChat={setSelectedChat}
              />
              <RightSide
                message={message}
                job={state?.job}
                selectedChat={selectedChat}
                refetch={refetch}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function LeftSide({ message, messages, setSelectedChat }) {
  const { t } = useTranslation();

  useEffect(() => {
    if (message?.messages) {
      setSelectedChat(message);
    }
  }, [message]);

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
          <Button
            key={i}
            onClick={() => setSelectedChat(msg)}
            className="list-group-item list-group-item-action border-0 px-3"
            sx={{
              justifyContent: "flex-start",
            }}
          >
            <div className="badge bg-success float-right">
              {msg?.messages?.filter((m) => m.seen === false)?.length}
            </div>
            <div className="d-flex align-items-start">
              <img
                src={msg?.participant?.avatar}
                className="rounded-circle mr-1 ml-1"
                alt={msg?.participant?.fullname}
                width="40"
                height="40"
              />
              <div className="flex-grow-1 ml-3">
                {msg?.participant?.fullname}
                <div className="small">
                  <span className="fas fa-circle chat-online"></span>{" "}
                  {t("Online")} / {t("Offline")}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
      <hr className="d-block d-lg-none mt-1 mb-0" />
    </div>
  );
}

function RightSide({ job, refetch, selectedChat, message }) {
  const { t } = useTranslation();
  const { state } = useLocation();

  console.log({ state });

  const { currentUser } = useSelector((state) => state.auth);

  const [chats, setChats] = useState([]);
  const [contracted, setContracted] = useState(false);

  const [sendMessageMut, { loading }] = useMutation(SEND_MESSAGE);
  const [createContract, createContractMutation] = useMutation(CREATE_CONTRACT);

  const { control, watch, trigger, reset, setValue } = useForm({
    mode: "all",
    resolver: contract_validator,
    defaultValues: {
      message: "",
    },
  });

  const scrollToBottom = () => {
    const messagesContainer = document.getElementById("chat-messages");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  const sendMessage = async () => {
    if (watch("message")) {
      try {
        await sendMessageMut({
          variables: {
            input: {
              content: watch("message"),
              receiver_id: message?.participant
                ? message?.participant?.id
                : selectedChat?.participant?.id,
            },
          },
        });

        refetch();

        scrollToBottom();

        setValue("message", "");
      } catch (error) {
        toast.error(error.message);
      }
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
              freelancer_id: selectedChat?.participant?.id,
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="col-12 col-lg-7 col-xl-9" style={{ height: "100%" }}>
      {selectedChat?.participant && (
        <>
          <div className="py-2 px-4 border-bottom d-none d-lg-block">
            <div className="d-flex align-items-center py-1" styl>
              <>
                <div className="position-relative">
                  <img
                    src={selectedChat?.participant?.avatar}
                    className="rounded-circle mr-1"
                    alt={selectedChat?.participant?.fullnam}
                    width="40"
                    height="40"
                  />
                </div>
                <div className="flex-grow-1 pl-3">
                  <strong>{selectedChat?.participant?.fullname}</strong>
                  <div className="text-muted small">
                    <em>{t("online")}</em>
                  </div>
                </div>
                <div>
                  {currentUser?.role === "employer" && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      disabled={!state?.job?.id}
                    >
                      {t("Start a Contract")}
                    </button>
                  )}

                  <NewContractModal
                    t={t}
                    control={control}
                    startContract={startContract}
                  />
                </div>
              </>
            </div>
          </div>
          <div
            className="position-relative"
            style={{ height: "calc(100% - 8.5rem)" }}
          >
            <div
              id="chat-messages"
              className="chat-messages p-4"
              style={{ overflowAnchor: "none", height: "100%" }}
            >
              {selectedChat?.messages?.map((msg, i) =>
                msg?.sender_id === currentUser?.id ? (
                  <RightSideMessage key={i} msg={msg} owner={msg?.sender} />
                ) : (
                  <LeftSideMessage key={i} msg={msg} owner={msg?.sender} />
                )
              )}

              <div
                id="anchor"
                style={{ overflowAnchor: "auto", height: "1px" }}
              ></div>
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
                      onKeyDown={handleKeyDown}
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
        {msg?.sender?.avatar ? (
          <img
            src={msg?.sender?.avatar}
            className="rounded-circle mr-1"
            alt={msg?.sender?.fullname}
            width="40"
            height="40"
          />
        ) : (
          <Avatar>
            {currentUser.id === msg?.sender?.id
              ? msg?.sender?.fullname[0]
              : msg?.sender?.fullname[0]}
          </Avatar>
        )}
        {/**/}
        <div
          className="text-muted small text-nowrap mt-2"
          style={{ fontSize: ".7rem", textTransform: "lowercase" }}
        >
          {new Date(msg?.createdAt)
            .toLocaleTimeString()
            .split(" ")[0]
            .substring(0, 5) +
            " " +
            new Date(msg?.createdAt).toLocaleTimeString().split(" ")[1]}
        </div>
      </div>
      <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div className="font-weight-bold mb-1">
          {msg?.sender?.fullname}
          {/* {currentUser.id === msg?.sender?.id
            ? msg?.sender?.fullname
            : msg?.receiver?.fullname} */}
        </div>
        {msg?.content}
      </div>
    </div>
  );
}

function RightSideMessage({ msg }) {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="chat-message-right pb-4">
      <div>
        {currentUser?.avatar ? (
          <img
            src={currentUser?.avatar}
            className="rounded-circle mr-1"
            alt="Chris Wood"
            width="40"
            height="40"
          />
        ) : (
          <Avatar>
            {currentUser.id === msg?.sender?.id
              ? currentUser.fullname[0]
              : currentUser.fullname[0]}
          </Avatar>
        )}

        <div
          className="text-muted small text-nowrap mt-2"
          style={{ fontSize: ".7rem", textTransform: "lowercase" }}
        >
          {new Date(msg?.createdAt)
            .toLocaleTimeString()
            .split(" ")[0]
            .substring(0, 5) +
            " " +
            new Date(msg?.createdAt).toLocaleTimeString().split(" ")[1]}
        </div>
      </div>
      <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
        <div className="font-weight-bold mb-1">You</div>
        {msg?.content}
      </div>
    </div>
  );
}

function NewContractModal({ t, control, startContract }) {
  return (
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
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
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
            <form className="row g-3 needs-validation">
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
  );
}

const contract_validator = yupResolver(
  Yup.object().shape({
    offered_amount: Yup.number().min(1).required(),
    start_date: Yup.date().required(),
    deadline_date: Yup.date().required(),
  })
);
