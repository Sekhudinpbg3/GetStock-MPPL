import Head from "next/head";
import { Button, Card, Input, MainMenu, Meta, Modal } from "../components";

export default function Home() {
  return (
    <>
      <Meta.Subtitle subtitle="ini adalah meta" />
      <div className="w-screen h-screen p-60">
        <Modal.Confirm />
        <MainMenu />
      </div>
    </>
  );
}
