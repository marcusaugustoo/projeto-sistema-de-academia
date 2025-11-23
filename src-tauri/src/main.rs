#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;
use std::process::Command;
use std::os::windows::process::CommandExt; // Necessário para esconder a janela preta

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      // 1. Descobre onde o arquivo server.exe foi parar depois de instalado
      let resource_path = app.path_resolver()
        .resolve_resource("server.exe")
        .expect("ERRO CRÍTICO: Não foi possível encontrar o server.exe nos recursos!");

      println!("Iniciando backend Python em: {:?}", resource_path);

      // 2. Inicia o processo manualmente
      Command::new(resource_path)
        // O código 0x08000000 (CREATE_NO_WINDOW) esconde a janela preta do terminal do Python
        .creation_flags(0x08000000) 
        .spawn()
        .expect("Falha ao iniciar o servidor Python");

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("erro ao rodar a aplicação tauri");
}