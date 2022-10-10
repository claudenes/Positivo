using System;

using AutoMapper;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Positivo.InterfaceAPI.Infrastructure.Data;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using Positivo.InterfaceAPI.Dto;
using Positivo.InterfaceAPI.Configuration.AutoMapper;
using Positivo.InterfaceAPI.Test.Setup;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Xunit;

namespace Positivo.InterfaceAPI.Test.Controllers
{
    public class PessoasContatoesControllerIntTest
    {
        public PessoasContatoesControllerIntTest()
        {
            _factory = new AppWebApplicationFactory<TestStartup>().WithMockUser();
            _client = _factory.CreateClient();

            _pessoasContatoRepository = _factory.GetRequiredService<IPessoasContatoRepository>();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            _mapper = config.CreateMapper();

            InitTest();
        }

        private static readonly decimal? DefaultPessoa = 1M;
        private static readonly decimal? UpdatedPessoa = 2M;

        private const string DefaultEmail = "AAAAAAAAAA";
        private const string UpdatedEmail = "BBBBBBBBBB";

        private const string DefaultEmailgoogle = "AAAAAAAAAA";
        private const string UpdatedEmailgoogle = "BBBBBBBBBB";

        private const string DefaultEndereco = "AAAAAAAAAA";
        private const string UpdatedEndereco = "BBBBBBBBBB";

        private const string DefaultEndnum = "AAAAAAAAAA";
        private const string UpdatedEndnum = "BBBBBBBBBB";

        private const string DefaultEndcompl = "AAAAAAAAAA";
        private const string UpdatedEndcompl = "BBBBBBBBBB";

        private const string DefaultBairro = "AAAAAAAAAA";
        private const string UpdatedBairro = "BBBBBBBBBB";

        private const string DefaultMunicipio = "AAAAAAAAAA";
        private const string UpdatedMunicipio = "BBBBBBBBBB";

        private const string DefaultUf = "AAAAAAAAAA";
        private const string UpdatedUf = "BBBBBBBBBB";

        private const string DefaultCep = "AAAAAAAAAA";
        private const string UpdatedCep = "BBBBBBBBBB";

        private const string DefaultDddfone = "AAAAAAAAAA";
        private const string UpdatedDddfone = "BBBBBBBBBB";

        private const string DefaultFone = "AAAAAAAAAA";
        private const string UpdatedFone = "BBBBBBBBBB";

        private const string DefaultDddcelular = "AAAAAAAAAA";
        private const string UpdatedDddcelular = "BBBBBBBBBB";

        private const string DefaultCelular = "AAAAAAAAAA";
        private const string UpdatedCelular = "BBBBBBBBBB";

        private const string DefaultDddcomercial = "AAAAAAAAAA";
        private const string UpdatedDddcomercial = "BBBBBBBBBB";

        private const string DefaultComercial = "AAAAAAAAAA";
        private const string UpdatedComercial = "BBBBBBBBBB";

        private static readonly DateTime? DefaultDtatualizacao = DateTime.UnixEpoch;
        private static readonly DateTime? UpdatedDtatualizacao = DateTime.Now;

        private readonly AppWebApplicationFactory<TestStartup> _factory;
        private readonly HttpClient _client;
        private readonly IPessoasContatoRepository _pessoasContatoRepository;

        private PessoasContato _pessoasContato;

        private readonly IMapper _mapper;

        private PessoasContato CreateEntity()
        {
            return new PessoasContato
            {
                Pessoa = DefaultPessoa,
                Email = DefaultEmail,
                Emailgoogle = DefaultEmailgoogle,
                Endereco = DefaultEndereco,
                Endnum = DefaultEndnum,
                Endcompl = DefaultEndcompl,
                Bairro = DefaultBairro,
                Municipio = DefaultMunicipio,
                Uf = DefaultUf,
                Cep = DefaultCep,
                Dddfone = DefaultDddfone,
                Fone = DefaultFone,
                Dddcelular = DefaultDddcelular,
                Celular = DefaultCelular,
                Dddcomercial = DefaultDddcomercial,
                Comercial = DefaultComercial,
                Dtatualizacao = DefaultDtatualizacao,
            };
        }

        private void InitTest()
        {
            _pessoasContato = CreateEntity();
        }

        [Fact]
        public async Task CreatePessoasContato()
        {
            var databaseSizeBeforeCreate = await _pessoasContatoRepository.CountAsync();

            // Create the PessoasContato
            PessoasContatoDto _pessoasContatoDto = _mapper.Map<PessoasContatoDto>(_pessoasContato);
            var response = await _client.PostAsync("/api/pessoas-contatoes", TestUtil.ToJsonContent(_pessoasContatoDto));
            response.StatusCode.Should().Be(HttpStatusCode.Created);

            // Validate the PessoasContato in the database
            var pessoasContatoList = await _pessoasContatoRepository.GetAllAsync();
            pessoasContatoList.Count().Should().Be(databaseSizeBeforeCreate + 1);
            var testPessoasContato = pessoasContatoList.Last();
            testPessoasContato.Pessoa.Should().Be(DefaultPessoa);
            testPessoasContato.Email.Should().Be(DefaultEmail);
            testPessoasContato.Emailgoogle.Should().Be(DefaultEmailgoogle);
            testPessoasContato.Endereco.Should().Be(DefaultEndereco);
            testPessoasContato.Endnum.Should().Be(DefaultEndnum);
            testPessoasContato.Endcompl.Should().Be(DefaultEndcompl);
            testPessoasContato.Bairro.Should().Be(DefaultBairro);
            testPessoasContato.Municipio.Should().Be(DefaultMunicipio);
            testPessoasContato.Uf.Should().Be(DefaultUf);
            testPessoasContato.Cep.Should().Be(DefaultCep);
            testPessoasContato.Dddfone.Should().Be(DefaultDddfone);
            testPessoasContato.Fone.Should().Be(DefaultFone);
            testPessoasContato.Dddcelular.Should().Be(DefaultDddcelular);
            testPessoasContato.Celular.Should().Be(DefaultCelular);
            testPessoasContato.Dddcomercial.Should().Be(DefaultDddcomercial);
            testPessoasContato.Comercial.Should().Be(DefaultComercial);
            testPessoasContato.Dtatualizacao.Should().Be(DefaultDtatualizacao);
        }

        [Fact]
        public async Task CreatePessoasContatoWithExistingId()
        {
            var databaseSizeBeforeCreate = await _pessoasContatoRepository.CountAsync();
            // Create the PessoasContato with an existing ID
            _pessoasContato.Id = 1L;

            // An entity with an existing ID cannot be created, so this API call must fail
            PessoasContatoDto _pessoasContatoDto = _mapper.Map<PessoasContatoDto>(_pessoasContato);
            var response = await _client.PostAsync("/api/pessoas-contatoes", TestUtil.ToJsonContent(_pessoasContatoDto));

            // Validate the PessoasContato in the database
            var pessoasContatoList = await _pessoasContatoRepository.GetAllAsync();
            pessoasContatoList.Count().Should().Be(databaseSizeBeforeCreate);
        }

        [Fact]
        public async Task CheckPessoaIsRequired()
        {
            var databaseSizeBeforeTest = await _pessoasContatoRepository.CountAsync();

            // Set the field to null
            _pessoasContato.Pessoa = null;

            // Create the PessoasContato, which fails.
            PessoasContatoDto _pessoasContatoDto = _mapper.Map<PessoasContatoDto>(_pessoasContato);
            var response = await _client.PostAsync("/api/pessoas-contatoes", TestUtil.ToJsonContent(_pessoasContatoDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var pessoasContatoList = await _pessoasContatoRepository.GetAllAsync();
            pessoasContatoList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task GetAllPessoasContatoes()
        {
            // Initialize the database
            await _pessoasContatoRepository.CreateOrUpdateAsync(_pessoasContato);
            await _pessoasContatoRepository.SaveChangesAsync();

            // Get all the pessoasContatoList
            var response = await _client.GetAsync("/api/pessoas-contatoes?sort=id,desc");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.[*].id").Should().Contain(_pessoasContato.Id);
            json.SelectTokens("$.[*].pessoa").Should().Contain(DefaultPessoa);
            json.SelectTokens("$.[*].email").Should().Contain(DefaultEmail);
            json.SelectTokens("$.[*].emailgoogle").Should().Contain(DefaultEmailgoogle);
            json.SelectTokens("$.[*].endereco").Should().Contain(DefaultEndereco);
            json.SelectTokens("$.[*].endnum").Should().Contain(DefaultEndnum);
            json.SelectTokens("$.[*].endcompl").Should().Contain(DefaultEndcompl);
            json.SelectTokens("$.[*].bairro").Should().Contain(DefaultBairro);
            json.SelectTokens("$.[*].municipio").Should().Contain(DefaultMunicipio);
            json.SelectTokens("$.[*].uf").Should().Contain(DefaultUf);
            json.SelectTokens("$.[*].cep").Should().Contain(DefaultCep);
            json.SelectTokens("$.[*].dddfone").Should().Contain(DefaultDddfone);
            json.SelectTokens("$.[*].fone").Should().Contain(DefaultFone);
            json.SelectTokens("$.[*].dddcelular").Should().Contain(DefaultDddcelular);
            json.SelectTokens("$.[*].celular").Should().Contain(DefaultCelular);
            json.SelectTokens("$.[*].dddcomercial").Should().Contain(DefaultDddcomercial);
            json.SelectTokens("$.[*].comercial").Should().Contain(DefaultComercial);
            json.SelectTokens("$.[*].dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetPessoasContato()
        {
            // Initialize the database
            await _pessoasContatoRepository.CreateOrUpdateAsync(_pessoasContato);
            await _pessoasContatoRepository.SaveChangesAsync();

            // Get the pessoasContato
            var response = await _client.GetAsync($"/api/pessoas-contatoes/{_pessoasContato.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.id").Should().Contain(_pessoasContato.Id);
            json.SelectTokens("$.pessoa").Should().Contain(DefaultPessoa);
            json.SelectTokens("$.email").Should().Contain(DefaultEmail);
            json.SelectTokens("$.emailgoogle").Should().Contain(DefaultEmailgoogle);
            json.SelectTokens("$.endereco").Should().Contain(DefaultEndereco);
            json.SelectTokens("$.endnum").Should().Contain(DefaultEndnum);
            json.SelectTokens("$.endcompl").Should().Contain(DefaultEndcompl);
            json.SelectTokens("$.bairro").Should().Contain(DefaultBairro);
            json.SelectTokens("$.municipio").Should().Contain(DefaultMunicipio);
            json.SelectTokens("$.uf").Should().Contain(DefaultUf);
            json.SelectTokens("$.cep").Should().Contain(DefaultCep);
            json.SelectTokens("$.dddfone").Should().Contain(DefaultDddfone);
            json.SelectTokens("$.fone").Should().Contain(DefaultFone);
            json.SelectTokens("$.dddcelular").Should().Contain(DefaultDddcelular);
            json.SelectTokens("$.celular").Should().Contain(DefaultCelular);
            json.SelectTokens("$.dddcomercial").Should().Contain(DefaultDddcomercial);
            json.SelectTokens("$.comercial").Should().Contain(DefaultComercial);
            json.SelectTokens("$.dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetNonExistingPessoasContato()
        {
            var maxValue = long.MaxValue;
            var response = await _client.GetAsync("/api/pessoas-contatoes/" + maxValue);
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpdatePessoasContato()
        {
            // Initialize the database
            await _pessoasContatoRepository.CreateOrUpdateAsync(_pessoasContato);
            await _pessoasContatoRepository.SaveChangesAsync();
            var databaseSizeBeforeUpdate = await _pessoasContatoRepository.CountAsync();

            // Update the pessoasContato
            var updatedPessoasContato = await _pessoasContatoRepository.QueryHelper().GetOneAsync(it => it.Id == _pessoasContato.Id);
            // Disconnect from session so that the updates on updatedPessoasContato are not directly saved in db
            //TODO detach
            updatedPessoasContato.Pessoa = UpdatedPessoa;
            updatedPessoasContato.Email = UpdatedEmail;
            updatedPessoasContato.Emailgoogle = UpdatedEmailgoogle;
            updatedPessoasContato.Endereco = UpdatedEndereco;
            updatedPessoasContato.Endnum = UpdatedEndnum;
            updatedPessoasContato.Endcompl = UpdatedEndcompl;
            updatedPessoasContato.Bairro = UpdatedBairro;
            updatedPessoasContato.Municipio = UpdatedMunicipio;
            updatedPessoasContato.Uf = UpdatedUf;
            updatedPessoasContato.Cep = UpdatedCep;
            updatedPessoasContato.Dddfone = UpdatedDddfone;
            updatedPessoasContato.Fone = UpdatedFone;
            updatedPessoasContato.Dddcelular = UpdatedDddcelular;
            updatedPessoasContato.Celular = UpdatedCelular;
            updatedPessoasContato.Dddcomercial = UpdatedDddcomercial;
            updatedPessoasContato.Comercial = UpdatedComercial;
            updatedPessoasContato.Dtatualizacao = UpdatedDtatualizacao;

            PessoasContatoDto updatedPessoasContatoDto = _mapper.Map<PessoasContatoDto>(updatedPessoasContato);
            var response = await _client.PutAsync($"/api/pessoas-contatoes/{_pessoasContato.Id}", TestUtil.ToJsonContent(updatedPessoasContatoDto));
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the PessoasContato in the database
            var pessoasContatoList = await _pessoasContatoRepository.GetAllAsync();
            pessoasContatoList.Count().Should().Be(databaseSizeBeforeUpdate);
            var testPessoasContato = pessoasContatoList.Last();
            testPessoasContato.Pessoa.Should().Be(UpdatedPessoa);
            testPessoasContato.Email.Should().Be(UpdatedEmail);
            testPessoasContato.Emailgoogle.Should().Be(UpdatedEmailgoogle);
            testPessoasContato.Endereco.Should().Be(UpdatedEndereco);
            testPessoasContato.Endnum.Should().Be(UpdatedEndnum);
            testPessoasContato.Endcompl.Should().Be(UpdatedEndcompl);
            testPessoasContato.Bairro.Should().Be(UpdatedBairro);
            testPessoasContato.Municipio.Should().Be(UpdatedMunicipio);
            testPessoasContato.Uf.Should().Be(UpdatedUf);
            testPessoasContato.Cep.Should().Be(UpdatedCep);
            testPessoasContato.Dddfone.Should().Be(UpdatedDddfone);
            testPessoasContato.Fone.Should().Be(UpdatedFone);
            testPessoasContato.Dddcelular.Should().Be(UpdatedDddcelular);
            testPessoasContato.Celular.Should().Be(UpdatedCelular);
            testPessoasContato.Dddcomercial.Should().Be(UpdatedDddcomercial);
            testPessoasContato.Comercial.Should().Be(UpdatedComercial);
            testPessoasContato.Dtatualizacao.Should().Be(UpdatedDtatualizacao);
        }

        [Fact]
        public async Task UpdateNonExistingPessoasContato()
        {
            var databaseSizeBeforeUpdate = await _pessoasContatoRepository.CountAsync();

            // If the entity doesn't have an ID, it will throw BadRequestAlertException
            PessoasContatoDto _pessoasContatoDto = _mapper.Map<PessoasContatoDto>(_pessoasContato);
            var response = await _client.PutAsync("/api/pessoas-contatoes/1", TestUtil.ToJsonContent(_pessoasContatoDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the PessoasContato in the database
            var pessoasContatoList = await _pessoasContatoRepository.GetAllAsync();
            pessoasContatoList.Count().Should().Be(databaseSizeBeforeUpdate);
        }

        [Fact]
        public async Task DeletePessoasContato()
        {
            // Initialize the database
            await _pessoasContatoRepository.CreateOrUpdateAsync(_pessoasContato);
            await _pessoasContatoRepository.SaveChangesAsync();
            var databaseSizeBeforeDelete = await _pessoasContatoRepository.CountAsync();

            var response = await _client.DeleteAsync($"/api/pessoas-contatoes/{_pessoasContato.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the database is empty
            var pessoasContatoList = await _pessoasContatoRepository.GetAllAsync();
            pessoasContatoList.Count().Should().Be(databaseSizeBeforeDelete - 1);
        }

        [Fact]
        public void EqualsVerifier()
        {
            TestUtil.EqualsVerifier(typeof(PessoasContato));
            var pessoasContato1 = new PessoasContato
            {
                Id = 1L
            };
            var pessoasContato2 = new PessoasContato
            {
                Id = pessoasContato1.Id
            };
            pessoasContato1.Should().Be(pessoasContato2);
            pessoasContato2.Id = 2L;
            pessoasContato1.Should().NotBe(pessoasContato2);
            pessoasContato1.Id = 0;
            pessoasContato1.Should().NotBe(pessoasContato2);
        }
    }
}
