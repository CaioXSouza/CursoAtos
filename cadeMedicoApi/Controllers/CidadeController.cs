using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using cadeMedicoApi.Data;
using cadeMedicoApi.Models;



namespace cadeMedicoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CidadeController : ControllerBase
    {
        //TESTE
        private readonly IRepository _repo;

        public CidadeController(IRepository repo){
            _repo = repo;   
        }

        //FIM DO TESTE


       /* [HttpGet]
        public IActionResult GetAction(){
            try{

                return Ok("Tamo funcionado! :D");
            }
            catch (Exception ex){
                return BadRequest($"Erro:{ex.Message}");
            }
        }*/

    

        [HttpGet]
        public async Task<IActionResult> Get(){
            try{
                var result = await _repo.GetAllCidadeModelAsync(true);
                return Ok(result);
            }
            catch (Exception ex){
                return BadRequest($"Erro: {ex.Message}");
            }
        }

                [HttpGet("{CidadeId}")]
        public async Task<IActionResult> getByCidadeId(int CidadeId){
            try{
                var result = await  _repo.GetCidadeModelById(CidadeId, true);
                return Ok(result);
            }
            catch(Exception ex){
                return BadRequest($"Erro: {ex.Message}");
            }
        }



                [HttpPost]
        public async Task<IActionResult> post(CidadeModel model){
            try{
                _repo.Add(model);
                if(await _repo.SaveChangesAsync()){
                    return Ok(model);
                }
            
            }
            catch(Exception ex){
                return BadRequest($"Erro: {ex.Message}");
            }
            return BadRequest();
        }

       [HttpPut("{cidadeId}")]
        public async Task<IActionResult> put(int cidadeId, CidadeModel model){
        
            try{
                
                var cidade = await _repo.GetCidadeModelById(cidadeId,false);
                if (cidade == null) {
                    return NotFound();
                }
                _repo.Update(model);

                if(await _repo.SaveChangesAsync()){
                    //return Ok("Alteração Realizada");
                    return Ok(new {message = "Alteração Realizada"});
                }
            }catch(Exception ex){
                return BadRequest($"Erro: {ex.Message}");
            }
            return BadRequest();
        }

                [HttpDelete("{cidadeId}")]
        public async Task<IActionResult> delete(int cidadeId){
            try{
                var cidade = await _repo.GetCidadeModelById(cidadeId, false);
                if(cidade == null) return NotFound();

                _repo.Delete(cidade);

                if(await _repo.SaveChangesAsync()){
                  //  return Ok("Cidade Deletada");
                  return Ok(new {message = "Cidade Deletada"});
                }
            }catch(Exception ex){
                return BadRequest($"ERRO: {ex.Message}");
            }
            return BadRequest();
        }
        
    }
}