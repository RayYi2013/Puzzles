import play.PlayJava

name := """employee"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.0"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache,
  javaWs,
  "joda-time" % "joda-time" % "2.5",
  "net.vz.mongodb.jackson" % "play-mongo-jackson-mapper_2.10" % "1.1.0"
)
